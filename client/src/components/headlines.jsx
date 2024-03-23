import { Link } from "react-router-dom";
import Card from "./Card";
export default function HeadLins({
  title = "Top Headlines",
  data = [
    {
      title: "title1",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimusLorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium,em ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimusLorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesen recusandae ducimus.",
      link: "/",
    },
    {
      title: "title2",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimusLorem em ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimusLorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesen ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimus.",
      link: "/",
    },
    {
      title: "title3",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing em ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimusLorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesen elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimus Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimus.",
      link: "/",
    },
    {
      title: "title4",
      des: "Lorem ipsum dolor sit amet consectetur em ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimusLorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesen adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimus Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eveniet non nulla ullam repellendus veniam suscipit iste. Praesentium, recusandae ducimus.",
      link: "/",
    },
  ]

}) {
  return (
    <div className="w-full bg-slate-200 dark:bg-gray-800/50 shadow-sm   p-3 grid  gap-4 rounded-md">
      <h2 className=" mx-auto  w-min  whitespace-nowrap capitalize text-4xl dark:text-white ">{title}</h2>
      <div className={` w-full grid gap-2 `}>
       {data.map((item)=> (<Card title={item.title} des={item.des} link={item.link} key={item.link}/>))}
      </div>
    </div>
  );
}
