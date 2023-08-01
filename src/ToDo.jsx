//react.js 파일에서 export 한 객체를 React로 받아서 사용
//{이름}의 경우는 export한 객체에서 이름에 해당하는 것만 받아서 사용
import React from "react";
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
    ListItemSecondaryAction,
    IconButton
} from "@material-ui/core";

//Icon 가져오기
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class ToDo extends React.Component{
    //생성자
    constructor(props){
        super(props);
        //props는 읽기 전용이라서 수정을 하고자 하는 경우
        //state에 복사해서 사용해야 합니다.
        this.state = {item:props.item, readOnly:true}
        this.delete = props.delete;
        this.update = props.update;
    }

    
    //삭제 아이콘을 눌렀을 때 호출될 함수
    deleteEventHandler = (e) => {
        this.delete(this.state.item);
        this.update(this.state.item);
    }

    //Event가 발생하면 readOnly의 값을 false로 수정
    offReadOnlyMode = (e) => {
        //state의 값을 직접 변경
        this.setState({readOnly:false})
    }

    //Enter를 눌렀을 때 동작하는 메서드
    enterKeyEventHandler = (e) => {
        if(e.key === "Enter"){
            this.setState({readOnly:true});
        }
    }

    //input의 내용을 변경했을 때 호출될 메서드
    editEventHandler = (e) =>{
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item:thisItem});
    }
    
    //체크박스의 값을 변경할 때 호출되는 메서드
    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({item:thisItem});
        this.update(this.state.item);
    }

    render(){
        const item=this.state.item;
        return(
            <ListItem>
                <Checkbox checked={item.done} 
                onChange={this.checkboxEventHandler} />
                <ListItemText>
                    <InputBase
                        inputProps={{"aria-label":"naked",
                    readOnly:this.state.readOnly}}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}/>
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete ToDo"
                    onClick={this.deleteEventHandler}
                    onKeyPress={this.enterKeyEventHandler}
                    onChange={this.editEventHandler}
                    >
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default ToDo;

