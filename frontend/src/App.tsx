import * as React from "react";
import './App.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import NoMatch from './pages/NoMatch';
import FindBestRate from './pages/FindBestRate';
import About from './pages/About';
import { Menu } from 'semantic-ui-react';

function App() {
    const [activeItem, setActiveItem]: [string, React.SetStateAction<any>] = React.useState('home');

    return (
        <div className="App">
            <Menu pointing>
                <Menu.Item
                    name='home'
                    as={Link}
                    active={activeItem === 'home'}
                    onClick={(event, { name }) => setActiveItem(name)}
                    to='/'
                ></Menu.Item>
                <Menu.Item
                    name='about'
                    as={Link}
                    active={activeItem === 'about'}
                    onClick={(event, { name }) => setActiveItem(name)}
                    to='/about'
                ></Menu.Item>
            </Menu>
            <Outlet />
            <Routes>
                <Route path="/" element={<FindBestRate />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </div>
  );
}

export default App;
