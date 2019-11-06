import promiseSettled from './PromiseSettled';
import Simple from './simple/view';
import style from './css.css';
import styles from './demo.css';


export default {
    component: Simple,
    someStyle: style.someSelector + styles.prefix,
    settled: promiseSettled
};
