import createDataContext from "./createDataContext";

const subjectReducer = (state, action) => {
    switch (action.type) {
        case "add-test":
            // คือการหา id ที่มากที่สุดแล้วบวกเพิ่ม 1
            const nextId = state.reduce((maxId, test) => {
                return Math.max(maxId, test._id);
            }, 0) + 1;

            return [
                ...state,
                {
                    _id: nextId,
                    sub_id: "",
                    subject_name: "",
                    sec: "",
                    room: "",
                    time: "",
                    day: "",
                }
            ]
        case "delete-test":
            // คือการลบข้อมูลที่มี id ตรงกับที่ส่งเข้ามา
            // โดยการ return ข้อมูลที่มี id ไม่ตรงกับที่ส่งเข้ามา 
            return state.filter((memo) => memo.id !== action.payload);
        case "edit-test":
            // คือการแก้ไขข้อมูลที่มี id ตรงกับที่ส่งเข้ามา
            // โดยการ return ข้อมูลที่มี id ตรงกับที่ส่งเข้ามา แล้วเปลี่ยนข้อมูลใหม่เข้าไป
            return state.map((memo) =>
				memo.id === action.payload.id ? action.payload : memo
			);
        default:
            return state;
    }
}

const addTest = (state, dispatch) => {
    return (sub_id, subject_name, sec, room, time, day) => {
        const updateTime = new Date()
        dispatch({
            type: "add-test",
            payload: {
                sub_id: action.payload.sub_id,
                subject_name: action.payload.subject_name,
                sec: action.payload.sec,
                room: action.payload.room,
                time: action.payload.time,
                day: action.payload.day
            }
        })

    }
}

const deleteTest = (state, dispatch) => {
    return (id) => {
        dispatch({
            type: "delete-test",
            payload: id
        })
    }
}

const editTest = (state, dispatch) => {
    return (id, sub_id, subject_name, sec, room, time, day) => {
        dispatch({
            type: "edit-test",
            payload: {
                id: id,
                sub_id: sub_id,
                subject_name: subject_name,
                sec: sec,
                room: room,
                time: time,
                day: day
            }
        })
    }
}

export const { Context, Provider } = createDataContext(
    subjectReducer,
    {
        addTest, deleteTest, editTest
    },
    [
        {
            _id: "1",
            sub_id: "01418223",
            subject_name: "Database System Concepts",
            sec: "700",
            room: "CB2301",
            time: "19:00-21:00",
            day: "29/09/2021",
        }
    ]
)