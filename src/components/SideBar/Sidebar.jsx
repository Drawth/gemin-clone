import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "../../index.css";
import { Context } from "../../context/Context";
function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChsat } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    await onSent(prompt);
    setRecentPrompt(prompt);
  };

  return (
    <div
      className={`bg-[#f0f4f9] min-h-screen  flex flex-col justify-between  py-4 transition-all duration-300 ${
        extended ? "w-64" : "w-16"
      }`}
    >
      {/* Üst Kısım */}
      <div>
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="w-5 block cursor-pointer ml-4 mb-6"
          src={assets.menu_icon}
          alt="menu"
        />

        {/* New Chat */}
        <div
          onClick={() => newChat()}
          className="flex items-center gap-3 px-4 py-2 bg-[#e6eaf1] rounded-xl text-[18px] text-gray-600 cursor-pointer hover:bg-[#d6dae0] transition-colors duration-300 mx-2"
        >
          <img className="w-5" src={assets.plus_icon} alt="plus" />
          {extended && (
            <span className="whitespace-nowrap transition-opacity duration-300 opacity-100">
              New Chat
            </span>
          )}
        </div>

        {/* Recent */}
        {extended && (
          <div className="mt-8 px-4 transition-all duration-300">
            <p className="mb-4 text-gray-500 font-medium">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-200 rounded px-2 text-gray-600"
                >
                  <img className="w-5" src={assets.message_icon} alt="msg" />
                  <p className="whitespace-nowrap">{item.slice(0, 20)}...</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Alt Menü */}
      <div className="flex flex-col gap-2 px-2 pb-4">
        <div className="logostyle">
          <img src={assets.question_icon} className="w-5" alt="help" />
          {extended && <p>Help</p>}
        </div>
        <div className="logostyle">
          <img src={assets.history_icon} className="w-5" alt="history" />
          {extended && <p>Activity</p>}
        </div>
        <div className="logostyle">
          <img src={assets.setting_icon} className="w-5" alt="settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
