import { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Main() {
  const {
    recentPrompt,
    showResult,
    loading,
    resultData,
    onSent,
    input,
    setInput,
  } = useContext(Context);

  return (
    <div className="flex-1 min-h-screen pb-40 relative">
      <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
        <p>Gemini</p>
        <img className="w-10 rounded-full" src={assets.user_icon} alt="" />
      </div>
      <div className="max-w-4xl m-auto">
        {!showResult ? (
          <>
            <div className="mx-12 text-[50px] text-[#c4c7c5] font-medium p-5">
              <p>
                <span className="custom-gradient-text">Hello, Dev.</span>
              </p>
              <p>How can I help you today? </p>
            </div>
            <div className="grid gap-[15px] p-5 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
              <div className="card">
                <p className="card-p">
                  Suggest beatiful places to see on an coming road trip
                </p>
                <img className="card-img" src={assets.compass_icon} alt="" />
              </div>

              <div className="card">
                <p className="card-p">
                  Briefly summarize this concept: urban planning
                </p>
                <img src={assets.bulb_icon} alt="" className="card-img" />
              </div>

              <div className="card">
                <p className="card-p">
                  Brainstorm team bonding activities for our work retreat{" "}
                </p>
                <img src={assets.message_icon} alt="" className="card-img" />
              </div>

              <div className="card">
                <p className="card-p">
                  Improve the readability of the following code
                </p>
                <img src={assets.code_icon} alt="" className="card-img" />
              </div>
            </div>
          </>
        ) : (
          <div
            style={{ padding: "0 5%", maxHeight: "70vh", overflowY: "scroll" }}
            className="hide-scrollbar"
          >
            <div className="mx-0 my-10 flex items-center gap-5">
              <img src={assets.user_icon} alt="" className="w-10 rounded-xl" />
              <p>{recentPrompt}</p>
            </div>
            <div className="flex items-start gap-5">
              <img
                src={assets.gemini_icon}
                alt=""
                className="w-10 rounded-xl"
              />
              {loading ? (
                <div className="w-full flex flex-col gap-2.5">
                  <hr className="loader animate-loader" />
                  <hr className="loader  animate-loader" />
                  <hr className="loader animate-loader" />
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: resultData }}
                  className="text-[17px] font-light leading-[1.8]"
                ></p>
              )}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSent(input);
          }}
        >
          <div className="absolute bottom-[0] w-full max-w-[900px]  py-5 m-auto">
            <div className="flex align-middle justify-between gap-5 bg-[#f0f4f9] px-2.5 py-2.5 rounded-3xl">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="flex-1 bg-transparent border-none outline-none p-2 text-base "
                type="text"
                placeholder="Enter a prompt here"
              />

              <div className="flex items-center gap-3.5">
                <img
                  className="w-6 cursor-pointer "
                  src={assets.gallery_icon}
                  alt=""
                />
                <img
                  className="w-6 cursor-pointer"
                  src={assets.mic_icon}
                  alt=""
                />
                <img
                  onClick={() => {
                    onSent(input);
                  }}
                  src={assets.send_icon}
                  alt=""
                  className="w-6 cursor-pointer"
                />
              </div>
            </div>
            <p className="text-sm mx-5 my-auto text-center text-[#585858] font-light">
              Gemini may display inaccurate info, including about people, so
              double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Main;
