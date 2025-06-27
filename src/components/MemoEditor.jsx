import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const MemoEditor = ({ selectedDate, memos, onSaveMemo, onDeleteMemo }) => {
  const [memoContent, setMemoContent] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 当选择日期变化时加载备忘录内容
  useEffect(() => {
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      setMemoContent(memos[dateStr] || '');
      setIsEdited(false);
    } else {
      setMemoContent('');
    }
  }, [selectedDate, memos]);

  // 处理内容变化
  const handleContentChange = (e) => {
    setMemoContent(e.target.value);
    setIsEdited(true);
  };

  // 处理保存备忘录
  const handleSave = () => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    onSaveMemo(dateStr, memoContent);
    setIsEdited(false);
  };

  // 处理删除备忘录
  const handleDelete = () => {
    if (!selectedDate) return;
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    onDeleteMemo(dateStr);
    setMemoContent('');
    setIsEdited(false);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  // 格式化显示日期
  const formatDisplayDate = () => {
    if (!selectedDate) return '请选择日期';
    return format(selectedDate, 'yyyy年MM月dd日 EEEE', { locale: zhCN });
  };

  // 检查是否有备忘录内容
  const hasContent = memoContent.trim() !== '';

  return (
    <div className="p-5 flex flex-col h-full animate-fade-in">
      <div className="mb-6 animate-slide-up">
  <h2 className="text-xl font-semibold text-neutral-800 mb-1">{format(selectedDate, 'yyyy年MM月dd日')}</h2>
  <p className="text-sm text-neutral-500">{format(selectedDate, 'EEEE', { locale: zhCN })}</p>
</div>

      {!selectedDate ? (
        <div className="flex-1 flex items-center justify-center text-neutral-500">
          <p>请在日历中选择一个日期来添加备忘录</p>
        </div>
      ) : (
        <>          
          <textarea
            className="flex-1 mb-4 p-4 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none shadow-sm hover:shadow-md"
            placeholder="点击此处开始记录你的想法、计划或重要事项..."
            value={memoContent}
            onChange={handleContentChange}
            rows={8}
          ></textarea>

          <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-neutral-200">
            {hasContent && (
              <button
              onClick={handleDelete}
              className="px-5 py-2.5 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 disabled:opacity-50 transition-all duration-200 flex items-center"
            >
              <i className="fa fa-trash mr-2"></i> 删除
            </button>
            )}
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-primary-gradient text-white rounded-lg hover:shadow-lg hover:shadow-primary/20 disabled:bg-neutral-300 transition-all duration-200 flex items-center"
              disabled={!isEdited}
            >
              <i className="fa fa-save mr-2"></i> 保存
            </button>
          </div>
        </>

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl transform transition-all animate-slide-up">
              <h3 className="text-lg font-semibold mb-2 text-neutral-800">确认删除</h3>
              <p className="text-neutral-600 mb-6 text-sm">你确定要删除这个备忘录吗？此操作无法撤销。</p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger-dark transition-colors"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        )}
      )}
    </div>
  );
};

export default MemoEditor;