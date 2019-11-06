import React from 'react';
// import className from 'classnames';
import styles from './index.css';

const VerySimpleComponent: React.FC<{ title: string}> = props => <p>{props.title}</p>;

const SimpleComponent: React.FC<void> = () => {
    const [flag, toggleFlag] = React.useState(true);
    return <h1
        onClick={() => toggleFlag(!flag)}
        className={flag ? styles.bold : styles.italic}
    >
        Simple component
        <VerySimpleComponent title="Hello" />
    </h1>;
};

export default SimpleComponent;
