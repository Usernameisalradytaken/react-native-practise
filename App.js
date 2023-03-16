import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {apiService} from './apiservices';

const style = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  commonText: {
    color: '#635985',
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
  },
  separator: {
    marginVertical: 8,
    borderBottomWidth: 5,
    borderBottomColor: '#2C3333',
  },
  errorText: {
    color: 'red',
  },
  item: {
    width: Dimensions.get('window').width,
    flex: 1,
    backgroundColor: '#FBFFB1',
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  roundButton1: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 25,
    backgroundColor: '#CD0404',
  },
});

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    // console.log("hi");
    async function getAll() {
      const data = await apiService.getAllNotes()
      // console.log("-----------",data)
      setTasks(data)
    }
    getAll()
  }, []);

  const handleSubmit = async () => {
    if (task == '' && desc == '') {
      Alert.alert('Fields are Empty');
    } else {
      console.log(task, desc);
      const temp = await apiService.addNote({
        task,
        desc,
        date:
          new Date().toJSON().slice(0, 10).replace(/-/g, '/') +
          ' ' +
          new Date().toLocaleTimeString(),
      });
      console.log(temp.id);
      setTasks(prev => {
        prev.push({
          key: temp.id,
          task: task,
          desc: desc,
          date:
            new Date().toJSON().slice(0, 10).replace(/-/g, '/') +
            ' ' +
            new Date().toLocaleTimeString(),
        });
        return prev;
      });
      handleClear();
    }
  };

  const handleClear = () => {
    setTask('');
    setDesc('');
  };

  const deleteTaskHandler = async id => {
    console.log(id);
    await apiService.deleteNote(id)
    setTasks(prev => {
      return prev.filter(item => item.key !== id);
    });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{padding: 10, height: '100%'}}>
        {/* <View style={{flex: 1, flexDirection: 'column'}}> */}
        {/* header */}
        <View
          style={{
            height: 100,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 20,
            borderBottomWidth: 5,
            borderBottomColor: '#2C3333',
            marginBottom: 5,
          }}>
          <Image
            source={{
              uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
            }}
            style={{
              width: 70,
              height: 70,
            }}
          />
          <Text style={style.boldText}>Cat Notes</Text>
        </View>
        {/* body */}
        <View style={{padding: 10}}>
          <Text style={style.commonText}>Task</Text>
          <TextInput
            value={task}
            style={style.input}
            onChangeText={text => setTask(text)}></TextInput>

          <Text style={style.commonText}>Description</Text>
          <TextInput
            value={desc}
            style={style.input}
            onChangeText={text => setDesc(text)}></TextInput>

          <View style={style.fixToText}>
            <Button title="Add button" onPress={() => handleSubmit()} />
            <Button title="Clear button" onPress={() => handleClear()} />
          </View>
          <Separator />
        </View>
        {/* </View> */}
        {/* <View style={{height: ''}}> */}
        <View style={{flex: 1, alignItems: 'center'}}>
          {tasks.length > 0 ? (
            <FlatList
              data={tasks}
              renderItem={({item}) => (
                <TaskItem
                  id={item.key}
                  title={item.task}
                  desc={item.desc}
                  date={item.date}
                  deleteTask={deleteTaskHandler}
                />
              )}
            />
          ) : (
            <Text style={[style.commonText]}>No Task Found</Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const TaskItem = ({id, title, desc, date, deleteTask}) => (
  <View style={style.item}>
    <View style={{flexShrink: 1}}>
      <Text style={{marginBottom: 5, fontStyle: 'italic'}}>
        {date.toString()}
      </Text>
      <Text style={style.title}>{title}</Text>
      <Text style={style.desc}>{desc}</Text>
    </View>
    <View style={{}}>
      <TouchableOpacity
        onPress={() => deleteTask(id)}
        style={style.roundButton1}>
        <Text style={{fontSize: 20, color: 'white'}}>X</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Separator = () => <View style={style.separator} />;

export default App;
