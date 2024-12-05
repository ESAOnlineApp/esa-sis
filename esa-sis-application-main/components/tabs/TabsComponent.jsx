"use client";
import { useState, useEffect, useRef } from "react";

const TabsComponent = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const firstBtnRef = useRef();

  useEffect(() => {
    firstBtnRef.current.focus();
  }, []);

  return (
    <div className="flex justify-center items-center py-12">
      <div className="flex flex-col gap-y-2 w-full">
        <div className="bg-primary p-1  rounded-xl flex justify-between items-center gap-x-2 font-bold text-white">
          {items.map((item, index) => (
            <button
              ref={index === 0 ? firstBtnRef : null}
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`outline-none w-full p-2 hover:bg-secondary rounded-xl text-cneter focus:ring-2 focus:bg-white focus:text-primary ${
                selectedTab === index ? "ring-2 bg-white text-primary" : ""
              } `}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="bg-white p-2 rounded-xl w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className={`${selectedTab == index ? "" : "hidden"}`}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
