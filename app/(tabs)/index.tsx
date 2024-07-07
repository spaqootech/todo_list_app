import { View, Text, TextInput, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import className from 'twrnc'
const index = () => {
  const [task , setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editKey , setEditKey] = useState(null)
  const addTask =()=>{
    if(task.trim()){
      if(editKey !==null){
        setTasks(tasks.map(item=>(item.key===editKey ? {key:item.key , value:task}:item)))
        setEditKey(null)
      }else{
    setTasks([...tasks,{key:tasks.length.toString(),value:task}])
      }
    setTask('')
    }
  }

  const delTask =(key)=>{
    setTasks(tasks.filter(task=>task.key !==key))
  }
  const editTask =(key , value)=>{
    setTask(value)
    setEditKey(key)
  }
  return (
    <View style={className`p-3 gap-2`}>
      <Text style={className`text-2xl font-bold`}>
        TODO LIST APP
      </Text>
      <View style={className`flex-row justify-between items-center gap-2 bg-white py-2 px-1 rounded-lg`}>
        <TextInput value={task} onChangeText={setTask} 
         placeholder='Enter TODOS'
        style={className`flex-1 p-2 text-lg bg-blue-100 rounded-lg`}/>
        <Pressable onPress={addTask}
        style={className`p-2 text-white text-lg bg-blue-500 rounded-lg`}>
          {editKey !==null ? 'Update':'Add'} todo
        </Pressable>
      </View>
      
      
      <FlatList data={tasks}
      renderItem={({item})=>(
        <View style={className`gap-2 my-2 bg-white p-2 rounded-xl`} key={item.key}>
        <Text style={className`text-lg`}
        >{item.value}</Text>
        <View style={className`flex-row justify-center items-center gap-2`}>
        <Pressable onPress={()=>editTask(item.key,item.value)}
        style={className`p-2 text-white text-lg bg-blue-500 rounded-lg flex-1 text-center`}>
          Edit
        </Pressable>
        <Pressable onPress={()=>delTask(item.key)}
        style={className`p-2 text-white text-lg bg-blue-500 rounded-lg flex-1 text-center`}>
          Delete
        </Pressable>
        </View>
      </View>
      )}/>

    </View>
  )
}

export default index