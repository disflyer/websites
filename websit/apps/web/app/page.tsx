import GroupView from "components/GroupView";
import UserButton from "components/UserButton";


export default function Page(): JSX.Element {
  return (
    <>
      <header className="flex flex-row-reverse py-3">
        <UserButton />
      </header>
      <h1 className="sm:text-[50px] text-[42px] text-center sm:pt-24 font-medium">Learning English by <span className="bg-[length:200%] font-bold animate-text-gradient bg-clip-text text-transparent bg-[linear-gradient(90deg,#0959aa_0%,#8a56cc_50%,#0959aa_100%)]">Chunks</span></h1>
      <div className="pt-12">
        <GroupView />
      </div>
    </>
  );
}
