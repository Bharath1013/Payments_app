
const Transactioncard = ({ username, amount,date }) => {
  function formatDateToIST(dateString) {
    const date = new Date(dateString);

    // Convert to IST (UTC +5:30)
    const offset = 5.5 * 60; // 5 hours and 30 minutes in minutes
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const istDate = new Date(utcDate.getTime() + offset * 60000);

    // Get components
    const day = istDate.getDate();
    const month = istDate.toLocaleString('default', { month: 'short' }); // Short month name
    const year = istDate.getFullYear();
    const hours24 = istDate.getHours();
    const minutes = istDate.getMinutes().toString().padStart(2, '0');
    const seconds = istDate.getSeconds().toString().padStart(2, '0');

    // Convert to 12-hour format
    const hours12 = hours24 % 12 || 12;
    const ampm = hours24 < 12 ? 'AM' : 'PM';

    // Format time
    const timeString = `${hours12}:${minutes}:${seconds} ${ampm}`;

    return `${month} ${day}, ${year} ${timeString}`;
}


  return (
    <div className="border-2 border-black-500 shadow-lg bg-white rounded-lg pt-4 pb-3 pl-2 pr-2">
      <div className="flex justify-between ">
        <div className="font-bold text-lg">{username}</div>
        <div className="text-black-500 text-lg pt-2 pb-2 pr-2">Rs. {amount}</div>
      </div>
      <div className="flex justify-end text-sm text-black-200 pt-2 pb-2 pr-2">{formatDateToIST(date)}</div>
    </div>
  );
};

export default Transactioncard;
