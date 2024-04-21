import SideBar from "../_components/SideBar";
import NavBar from "../_components/NavBar";
import Card from "./_components/Card";
import { CardList } from "./_components/CardList";
import DashBoardHeader from "./_components/DashBoardTitle";

export default function Home() {
  return (
    <div className="h-full w-full flex relative">
      <SideBar />
      <NavBar />
      <div className="z-10 w-full h-full ml-52 pt-10  ">
        <div className="p-10   flex flex-col">
          {/* 上部タイトルとアイコン */}
          <DashBoardHeader />
          <div className="h-10 w-full " />
          {/* カードリスト */}
          <CardList>
            {/* カード */}
            <Card />
          </CardList>
        </div>
      </div>
    </div>
  );
}
