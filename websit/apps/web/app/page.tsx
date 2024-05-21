import Image from "next/image";
import styles from "./page.module.css";
import CardList from "components/CardList";


export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1 className="text-[50px] text-center pt-32">Learning English by <span className="bg-[length:200%] font-bold animate-text-gradient bg-clip-text text-transparent bg-[linear-gradient(90deg,#0959aa_0%,#8a56cc_50%,#0959aa_100%)]">Chunks</span></h1>
      <div className="pt-12 px-40">
        <CardList></CardList>
      </div>
    </main>
  );
}
