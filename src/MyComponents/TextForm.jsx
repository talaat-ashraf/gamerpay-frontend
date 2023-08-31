import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";


export default function TextForm() {
  const { register, handleSubmit, reset } = useForm();
  const [text, setText] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/getText")
      .then((response) => response.json())
      .then((data) => setText(data));
  }, []);


  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:8080/api/v1/addText", {
      method: "POST",
      body: JSON.stringify({
        text: data.text,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch("http://localhost:8080/api/v1/getText")
      .then((response) => response.json())
      .then((e) => setText(e));
      })
      .catch((err) => {
        console.log(err.message);
      });
      
    reset();
  };

  return (
    <>
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-300 flex flex-col justify-start items-start space-y-4 ml-10 p-5"
      >
        <div>
          <label className="text-sm font-medium leading-6 text-gray-900 ">
            Enter Text
          </label>
        </div>
        <div>
          <input
            {...register("text")}
            className="rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Text"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    <div>
    <table className="border-separate border-spacing-2 border border-slate-500">
      <thead>
        <tr>
          <th>ID</th>
          <th>Text</th>
        </tr>
      </thead>
      <tbody>
        {text.map((oneText) => {
          return (
            <tr key={oneText.id}>
              <td className="border border-slate-700">{oneText.id}</td>
              <td className="border border-slate-700">{oneText.text}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
    </>
  );
}
