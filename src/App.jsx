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
    <div className="min-h-screen bg-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-neutral-900 mb-2">
            <i className="fa fa-calendar-check-o text-primary mr-2"></i>日历备忘录
          </h1>
          <p className="text-neutral-500">记录你的重要日程和待办事项</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            memos={memos}
          />
          <MemoEditor
            selectedDate={selectedDate}
            memos={memos}
            onSaveMemo={saveMemo}
            onDeleteMemo={deleteMemo}
          />
        </main>

        <footer className="mt-12 text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} 日历备忘录 | 使用React和Tailwind CSS构建</p>
        </footer>
      </div>
    </div>
  );
}

export default App
