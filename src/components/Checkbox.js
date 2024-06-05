const Checkbox = ({ isChecked, onChange }) => (
  <input type="checkbox" checked={isChecked} onChange={onChange} />
);

export default Checkbox;
