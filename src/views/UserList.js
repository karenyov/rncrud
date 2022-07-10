import { getActionFromState } from '@react-navigation/native'
import { Avatar, Button, Icon, ListItem } from '@rneui/themed'
import React, { useContext } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import UsersContext from '../context/UsersContext'

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                        
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem.Swipeable
                key={user.id} bottomDivider 
                onPress={() => props.navigation.navigate('UserForm', user)}
                leftContent={(reset) => (
                    <Button
                      title="Editar"
                      onPress={() => props.navigation.navigate('UserForm', user)}
                      icon={{ name: 'edit', color: 'white' }}
                      buttonStyle={{ minHeight: '100%' }}
                    />
                  )}
                  rightContent={(reset) => (
                    <Button
                      title="Deletar"
                      onPress={() => confirmUserDeletion(user)}
                      icon={{ name: 'delete', color: 'white' }}
                      buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                    />
                  )}
                >

                <Avatar
                    size={50}
                    rounded
                    source={user.avatarUrl ? { uri: user.avatarUrl } : {}}
                    key={user.id}
                />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem.Swipeable>
        )
    }
    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}