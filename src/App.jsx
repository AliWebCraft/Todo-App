import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [inputTodo, setInputTodo] = useState('');
  const [saveTodo, setSaveTodo] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    setSaveTodo(JSON.parse(localStorage.getItem('Todos')) || []);
  }, []);

  const handleInput = (e) => {
    setInputTodo(e.target.value);
  };

  const handleAdd = () => {
    if (inputTodo.length < 5) {
      toast.error('Minimum Five characters, Needed!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const todo = { text: inputTodo, id: uuidv4(), completed: false };
      setSaveTodo([...saveTodo, todo]);
      localStorage.setItem('Todos', JSON.stringify([...saveTodo, todo]));
      setInputTodo('');
      if (toast) {
        toast.success('Todo Has Been Added!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const handleCheckBox = (id) => {
    setSaveTodo(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed }
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    if (saveTodo.length > 0) {
      localStorage.setItem('Todos', JSON.stringify(saveTodo));
    }
  }, [saveTodo]);

  const handleDelete = (id) => {
    const result = confirm("Are you sure you want to delete this todo?");
    if (result) {
      const items = saveTodo.filter(item => item.id !== id);
      setSaveTodo(items);
      localStorage.setItem('Todos', JSON.stringify(items));
      if (toast) {
        toast.success('Todo Has Been Deleted!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      if (toast) {
        toast.info('You Canceled Deleting todo!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }

  const handleEdit = (id) => {
    const items = saveTodo.filter(items => items.id === id)
    const textvalue = items.map(item => item.text)
    setInputTodo(textvalue)
    // for Deleting 
    const items2 = saveTodo.filter(items => items.id !== id)
    setSaveTodo(items2)
    localStorage.setItem('Todos', JSON.stringify(items2));
  }

  return (
    <div className="bg-cover bg-center bg-fixed min-h-screen" style={{ backgroundImage: "url('icons/Background.jpeg')" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="Logo select-none flex pt-5 justify-center font-bold text-2xl gap-2 ">
        <span className='rounded-[50%] text-center w-[32px] h-[32px] bg-black text-white'>&#x2713;</span> <span>Todo App</span>
      </div>
      <div className="Body pt-10 md:m-auto w-[97%] md:w-[55%] pb-32">
        <div className="Tasks mt-6">
          <div className='flex justify-between'>
            <span className='text-2xl ml-[2.5vw] md:ml-0 font-bold select-none'>Tasks</span>
            <div className='flex gap-2 mt-[6px]'>
              <span className='text-sm font-bold mt-[1px]'>Show Finished</span>
              <span className='text-center'>
                <input
                  className='cursor-pointer' type="checkbox" name="finished" checked={showCompleted}
                  onChange={() => setShowCompleted(!showCompleted)}
                />
              </span>
            </div>
          </div>
          {saveTodo.length === 0 ? (
            <div className='font-bold mt-8 ml-10'>
              <p>You don't have any todos yet.</p>
            </div>
          ) : (
            <div>
              {saveTodo.map(todo => (
                <div key={todo.id}>
                  {(showCompleted || !todo.completed) && (
                    <div className="cards mt-3">
                      <div style={{ backgroundColor: todo.completed ? '#E6E6FA' : '#E5E4E2' }} className="card min-w-[98vw] ml-[1vw] md:ml-0 md:min-w-full px-1 border border-gray-900 min-h-10 flex align-middle justify-between mb-[6px] rounded-md bg-gray-400">
                        <div className="text flex items-center justify-center">
                          <div onClick={() => handleCheckBox(todo.id)} className='min-w-7 cursor-pointer mt-[2px]'>
                            <img width={'19px'} src={todo.completed ? "icons/check-dark.png" : "icons/check-white.png"} alt="" />
                          </div>
                          <div className="todotext">
                            <span style={{ color: todo.completed ? '#3b82f6' : 'black', textDecorationLine: todo.completed ? "line-through" : "none" }} className='text-[12px] md:text-sm font-semibold'>{todo.text}</span>
                          </div>
                        </div>
                        <div className="btn flex items-center justify-center gap-2 ml-2">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => handleEdit(todo.id)} className='Edit mt-1'>
                              <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{ width: '18px' }}
                              />
                            </button>
                            <div className="text-center font-sm">
                              <button onClick={() => handleDelete(todo.id)} className='Delete mt-1'>
                                <lord-icon
                                  src="https://cdn.lordicon.com/skkahier.json"
                                  trigger="hover"
                                  colors="primary:#c71f16"
                                  style={{ width: '20px' }}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="Input flex justify-center  w-full fixed bottom-10">
        <input className='w-[78vw] pl-2 md:w-[50vw] bg-gray-200 border-2 border-black active:border-none h-8 focus:outline-none rounded-l-md text-sm' placeholder='What do you need to do?' type="text" name="todo" value={inputTodo} onChange={handleInput} />
        <button onClick={handleAdd} className='w-16 h-8 rounded-r-md text-white flex justify-center focus:outline-none bg-black text-sm font-semibold gap-1'>
          <span className='mb-5'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: '17px' }}>
            </lord-icon>
          </span><span className='mt-[5px]'>Add</span></button>
      </div>
    </div>
  );
}

export default App;
