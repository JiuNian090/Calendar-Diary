import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const Calendar = ({ selectedDate, onDateSelect, memos }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 当选择日期变化时更新日历显示（如果月份不同）
  useEffect(() => {
    if (selectedDate && !isSameMonth(selectedDate, currentMonth)) {
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth()));
    }
  }, [selectedDate]);

  // 获取当前月份的所有日期
  const getDaysInMonth = () => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  // 导航到上一个月
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // 导航到下一个月
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // 格式化月份标题
  const formatMonthTitle = () => {
    return format(currentMonth, 'yyyy年 MM月', { locale: zhCN });
  };

  // 检查日期是否有备忘录
  const hasMemo = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return memos[dateStr] && memos[dateStr].trim() !== '';
  };

  return (
    <div className="card p-5">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="上一个月"
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        <h2 className="text-xl font-semibold text-neutral-900">{formatMonthTitle()}</h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="下一个月"
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>

      {/* 星期标题行 */}
      <div className="grid grid-cols-7 mb-2">
        {['一', '二', '三', '四', '五', '六', '日'].map((day) => (
          <div key={day} className="text-center py-2 text-sm font-medium text-neutral-500">
            {day}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth().map((date) => (
          <button
            key={format(date, 'yyyy-MM-dd')}
            onClick={() => onDateSelect(date)}
            className={`calendar-day ${!isSameMonth(date, currentMonth) ? 'disabled' : ''} ${selectedDate && isSameDay(date, selectedDate) ? 'selected' : ''} ${hasMemo(date) ? 'has-memo' : ''}`}
            aria-label={`选择日期 ${format(date, 'yyyy年MM月dd日')}`}
            disabled={!isSameMonth(date, currentMonth)}
          >
            <span>{date.getDate()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;