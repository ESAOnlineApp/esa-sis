import React, { useState, useRef, useEffect } from "react";

const CustomSelectBox = ({
  options,
  placeholder,
  onSelect,
  styled,
  enable = true,
  oldvalue = "",
  refresh = false
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(oldvalue);
  const [inputValue, setInputValue] = useState("");

  let menuRef = useRef();

  {
    enable === true &&
      document.addEventListener("mousedown", (e) => {
        if (!menuRef.current?.contains(e.target)) {
          setOpen(false);
        }
      });
  }

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    setInputValue("");
    onSelect(option); // Pass the selected value back to the parent component
  };
 useEffect(() => {
  refresh && setSelected("")
 },[refresh])
 
  return (
    <div className={styled}>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex border-zinc-300 items-center justify-between rounded ${
          !selected && "text-gray-400 font-normal"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : placeholder}
      </div>
      <ul
        ref={menuRef}
        className={`bg-white mt-2 overflow-y-auto absolute w-40 z-50 ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Search..."
            className="placeholder:text-gray-700 p-2 outline-none w-full"
          />
        </div>
        <li
          key={0}
          className={`p-2 text-sm hover:bg-sky-600 hover:text-white h-9`}
          onClick={() => handleSelect("")}
        ></li>
        {options?.map((option, index) => (
          <li
            key={index + 1}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              option?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              option?.toLowerCase().includes(inputValue) ? "block" : "hidden"
            }`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelectBox;
