import Topbar from "../../componentss/Topbar/Topbar";
import SideBar from "../../componentss/sideBar/SideBar";
import Rightbar from "../../componentss/rightbar/Rightbar";
import Feed from "../../componentss/feed/Feed";
import "./home.css"

export default function Home() {
  return (
    <>
    <Topbar/>
    <div className="homeContainer">
      <div className="Side">
    <SideBar />
    </div>
    <Feed />
    <Rightbar/>

    </div>
    
    </>
  );
}
