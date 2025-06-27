import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import MemoEditor from './components/MemoEditor';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [memos, setMemos] = useState({});

  // 从localStorage加载备忘录数据
  useEffect(() => {
    try {
      const savedMemos = localStorage.getItem('calendarMemos');
      if (savedMemos) {
        setMemos(JSON.parse(savedMemos));
      }
    } catch (error) {
      console.error('Failed to load memos from localStorage:', error);
      alert('加载备忘录失败，请刷新页面重试');
    }
  }, []);

  // 保存备忘录到localStorage
  const saveMemo = (dateStr, content) => {
    try {
      const updatedMemos = { ...memos, [dateStr]: content };
      setMemos(updatedMemos);
      localStorage.setItem('calendarMemos', JSON.stringify(updatedMemos));
      // 显示保存成功提示
      alert('备忘录保存成功！');
    } catch (error) {
      console.error('Failed to save memo to localStorage:', error);
      alert('保存备忘录失败，请重试');
    }
  };

  // 删除备忘录
  const deleteMemo = (dateStr) => {
    try {
      const updatedMemos = { ...memos };
      delete updatedMemos[dateStr];
      setMemos(updatedMemos);
      localStorage.setItem('calendarMemos', JSON.stringify(updatedMemos));
    } catch (error) {
      console.error('Failed to delete memo from localStorage:', error);
      alert('删除备忘录失败，请重试');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center animate-slide-up">
          <div className="inline-block bg-primary-gradient text-white px-6 py-3 rounded-xl mb-4 shadow-lg">
            <i className="fa fa-calendar-check-o mr-2 text-xl"></i>
            <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold">日历备忘录</h1>
          </div>
          <p className="text-neutral-600 max-w-2xl mx-auto">轻松记录和管理你的重要日程、待办事项和个人笔记，让每一天都井井有条</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              memos={memos}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
            <MemoEditor
              selectedDate={selectedDate}
              memos={memos}
              onSaveMemo={saveMemo}
              onDeleteMemo={deleteMemo}
            />
          </div>
        </main>

        <footer className="mt-12 text-center text-neutral-500 text-sm animate-slide-up">
          <p className="mb-2">© {new Date().getFullYear()} 日历备忘录</p>
          <p className="text-xs opacity-80">使用React和Tailwind CSS构建 | 本地数据安全存储</p>
        </footer>
      </div>
    </div>
  );
}

export default App
