import { useState } from 'react';
import DatePicker from './components/DatePicker';
import './index.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className='container'>
      <DatePicker containerClasses="datepicker" selectedDate={selectedDate} onChangeSelectedDate={setSelectedDate} />
    </div>
  )
}

export default App
