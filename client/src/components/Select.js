import '../styles/Select.css';
import { groups } from '../util/groupList';

function Select() {
  return (
    <div>
      <label htmlFor='tags' className='select-label'>
        Group
      </label>
      <select name='tags' id='tags' className='select-options'>
        {groups.map((group) => (
          <option key={group.name} value='ACL'>{group.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
