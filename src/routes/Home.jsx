import Header from '@/components/Header';
import TodosLogic from '@/components/TodosLogic';

const TodoApp = () => {
    return (
        //<div className="wrapper">
        <div className="todos">

            <div className="todos">
                <Header>
                    <h1>todos</h1>
                    <p>Items will persist in the browser local storage</p>
                </Header>
                <TodosLogic/>
            </div>
        </div>
        //</div>
    );
};
export default TodoApp;
