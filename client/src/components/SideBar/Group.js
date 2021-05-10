import '../../styles/Group.css';

function Group({ groupsOrTag, setGroupOrTag, tags }) {
  const { name, color } = groupsOrTag;

  const groupPageStyle = (color) => ({
    groupStyle: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: '18px 10px',
      backgroundColor: color,
      opacity: '0.8',
      border: '1px solid black',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'red',
      },
    },
  });

  return (
    <div style={groupPageStyle(color).groupStyle}>
      <p className='group-name' onClick={() => setGroupOrTag(false)}>
        {name}
      </p>
    </div>
  );
}

export default Group;
