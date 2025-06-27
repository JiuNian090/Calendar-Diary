import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const MemoEditor = ({ selectedDate, memos, onSaveMemo, onDeleteMemo }) => {
  const [memoContent, setMemoContent] = useState('');
  const [isEdited, setIsEdited] = useState(false);

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
    if (window.confirm('确定要删除这条备忘录吗？')) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      onDeleteMemo(dateStr);
      setMemoContent('');
      setIsEdited(false);
    }
  };

  // 格式化显示日期
  const formatDisplayDate = () => {
    if (!selectedDate) return '请选择日期';
    return format(selectedDate, 'yyyy年MM月dd日 EEEE', { locale: zhCN });
  };

  // 检查是否有备忘录内容
  const hasContent = memoContent.trim() !== '';

  return (
    <div className="card p-5 flex flex-col h-full">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">{formatDisplayDate()}</h2>

      {!selectedDate ? (
        <div className="flex-1 flex items-center justify-center text-neutral-500">
          <p>请在日历中选择一个日期来添加备忘录</p>
        </div>
      ) : (
        <>          
          <textarea
            className="memo-input flex-1 mb-4"
            placeholder="在这里输入你的备忘录..."
            value={memoContent}
            onChange={handleContentChange}
            rows={8}
          ></textarea>

          <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-neutral-200">
            {hasContent && (
              <button
                onClick={handleDelete}
                className="btn-secondary"
              >
                <i className="fa fa-trash mr-1"></i> 删除
              </button>
            )}
            <button
              onClick={handleSave}
              className="btn-primary"
              disabled={!isEdited}
            >
              <i className="fa fa-save mr-1"></i> 保存
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MemoEditor;