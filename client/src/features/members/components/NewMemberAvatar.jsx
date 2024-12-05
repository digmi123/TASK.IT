import avatar from "@/assets/user.svg";
import plus from "@/assets/add.svg";

function NewMemberAvatar({ memberName }) {
  return (
    <div id="avatar-wrapper" className="relative">
      <img src={avatar} alt="avatar" className="w-12 h-12" />
      {/* <img src={plus} alt="add" className="w-4 h-4 absolute bottom-0 right-0" /> */}
      <p className="text-center">Name</p>
    </div>
  );
}

export default NewMemberAvatar;
