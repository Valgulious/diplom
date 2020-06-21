import React from 'react'

const Edit = () => {
    return (
        <div uk-grid=''>
            <div id='menu'>
                <div>
                    <h3>Разделы:</h3>
                </div>
                <div>
                    <h3>Диагнозы</h3>
                </div>
                <div>
                    <h3>Показатели</h3>
                </div>
                <div>
                    <h3>Возможные значения</h3>
                </div>
                <div>
                    <h3>Нормальные значения</h3>
                </div>
                <div>
                    <h3>Клиническая картина</h3>
                </div>
                <div>
                    <h3>Степени тяжести</h3>
                </div>
                <div>
                    <h3>Значения показателей для степеней тяжести</h3>
                </div>
                <div>
                    <h3>Значения показателей для диагноза</h3>
                </div>
            </div>
            <div id='content'>
                <div>
                    <p>
                        Выберите нужный раздел
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Edit