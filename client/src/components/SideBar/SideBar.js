import { useState } from 'react';
import '../../styles/SideBar.css';

import { groups } from '../../util/groupList';
import { tags } from '../../util/tagList';
import Group from './Group';

function SideBar() {
  const [groupOrTag, setGroupOrTag] = useState(true);
  let groupTags;

  if (groupOrTag) {
    groupTags = groups;
  } else {
    groupTags = tags;
  }

  return (
    <>
      <div className='sidebar'>
        <h1>{groupOrTag ? 'Group' : 'Tags'}</h1>
        {groupTags.map((gt) => (
          <div key={gt.name}>
            <Group groupsOrTag={gt} setGroupOrTag={setGroupOrTag} tags={tags} />
          </div>
        ))}
      </div>
      <div className='sidebar'>Resources Here</div>
    </>
  );
}

export default SideBar;
