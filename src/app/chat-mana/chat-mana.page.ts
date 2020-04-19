import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, IonContent, Events } from '@ionic/angular';
import {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as subscriptions from '../../graphql/subscriptions';
import { CognitoServiceService } from '../cognito-service.service';
import { Router } from '@angular/router';
import { appInitialize } from '@ionic/angular/dist/app-initialize';

@Component({
  selector: 'app-chat-mana',
  templateUrl: './chat-mana.page.html',
  styleUrls: ['./chat-mana.page.scss'],
})
export class ChatManaPage implements OnInit {
  @ViewChild('content') content: IonContent;
  @ViewChild('chat_input') messageInput: ElementRef;
  chatUser: any; 
  order: any;
  inp_text: any;
  conversationMessages: Array<any>;
  editorMsg = '';
  showEmojiPicker = false;  

  public count = 0;
  // public arr = [
  //   {
  //     "messageId": "1",
  //     "userId": "140000198202211138",
  //     "userName": "Luff",
  //     "userImgUrl": "./assets/user.jpg",
  //     "toUserId": "210000198410281948",
  //     "toUserName": "Hancock",
  //     "userAvatar": "./assets/to-user.jpg",
  //     "time": 1488349800000,
  //     "message": "Hey, that\'s an awesome chat UI",
  //     "status": "success"

  //   },
  //   {
  //     "messageId": "2",
  //     "userId": "210000198410281948",
  //     "userName": "Hancock",
  //     "userImgUrl": "./assets/to-user.jpg",
  //     "toUserId": "140000198202211138",
  //     "toUserName": "Luff",
  //     "userAvatar": "./assets/user.jpg",
  //     "time": 1491034800000,
  //     "message": "Right, it totally blew my mind. They have other great apps and designs too !",
  //     "status": "success"
  //   },
  //   {
  //     "messageId": "3",
  //     "userId": "140000198202211138",
  //     "userName": "Luff",
  //     "userImgUrl": "./assets/user.jpg",
  //     "toUserId": "210000198410281948",
  //     "toUserName": "Hancock",
  //     "userAvatar": "./assets/to-user.jpg",
  //     "time": 1491034920000,
  //     "message": "And it is free ?",
  //     "status": "success"
  //   },
  //   {
  //     "messageId": "4",
  //     "userId": "210000198410281948",
  //     "userName": "Hancock",
  //     "userImgUrl": "./assets/to-user.jpg",
  //     "toUserId": "140000198202211138",
  //     "toUserName": "Luff",
  //     "userAvatar": "./assets/user.jpg",
  //     "time": 1491036720000,
  //     "message": "Yes, totally free. Beat that ! ",
  //     "status": "success"
  //   },
  //   {
  //     "messageId": "5",
  //     "userId": "210000198410281948",
  //     "userName": "Hancock",
  //     "userImgUrl": "./assets/to-user.jpg",
  //     "toUserId": "140000198202211138",
  //     "toUserName": "Luff",
  //     "userAvatar": "./assets/user.jpg",
  //     "time": 1491108720000,
  //     "message": "Wow, that\'s so cool. Hats off to the developers. This is gooood stuff",
  //     "status": "success"
  //   },
  //   {
  //     "messageId": "6",
  //     "userId": "140000198202211138",
  //     "userName": "Luff",
  //     "userImgUrl": "./assets/user.jpg",
  //     "toUserId": "210000198410281948",
  //     "toUserName": "Hancock",
  //     "userAvatar": "./assets/to-user.jpg",
  //     "time": 1491231120000,
  //     "message": "Check out their other designs.",
  //     "status": "success"
  //   }
  // ]



  constructor(private events: Events, private cognitoService : CognitoServiceService, private router: Router ) {
    // this.msgList = [
    //   {
    //     userId: this.User,
    //     userName: this.User,
    //     userAvatar: "assets/driver.jpeg",
    //     time: "12:01 pm",
    //     message: 'Hey, that\'s an awesome chat UI',
    //     upertext: 'Hello'
    //   },
    //   {
    //     userId: this.toUser,
    //     userName: this.toUser,
    //     userAvatar: "assets/user.jpeg",
    //     time: "12:01 pm",
    //     message: "Right, it totally blew my mind. They have other great apps and designs too!",
    //     upertext: "Hii"
    //   },
    //   {
    //     userId: this.User,
    //     userName: this.User,
    //     userAvatar: "assets/driver.jpeg",
    //     time: "12:01 pm",
    //     message: 'And it is free ?',
    //     upertext: 'How r u '
    //   },
    //   {
    //     userId: this.toUser,
    //     userName: this.toUser,
    //     userAvatar: "assets/user.jpeg",
    //     time: "12:01 pm",
    //     message: 'Yes, totally free. Beat that !',
    //     upertext: 'good'
    //   },
    //   {
    //     userId: this.User,
    //     userName: this.User,
    //     userAvatar: "assets/driver.jpeg",
    //     time: "12:01 pm",
    //     message: 'Wow, that\'s so cool. Hats off to the developers. This is gooood stuff',
    //     upertext: 'How r u '
    //   },
    //   {
    //     userId: this.toUser,
    //     userName: this.toUser,
    //     userAvatar: "assets/user.jpeg",
    //     time: "12:01 pm",
    //     message: 'Check out their other designs.',
    //     upertext: 'good'
    //   },
    //   {
    //     userId: this.User,
    //     userName: this.User,
    //     userAvatar: "assets/driver.jpeg",
    //     time: "12:01 pm",
    //     message: 'Have you seen their other apps ? They have a collection of ready-made apps for developers. This makes my life so easy. I love it! ',
    //     upertext: 'How r u '
    //   },
    //   {
    //     userId: this.toUser,
    //     userName: this.toUser,
    //     userAvatar: "assets/user.jpeg",
    //     time: "12:01 pm",
    //     message: 'Well, good things come in small package after all',
    //     upertext: 'good'
    //   },
    // ];

  }

  async getUserChat(){
    //Initializing APPSync
    var meQuery = API.graphql(graphqlOperation(queries.me)) as Promise<any>;    

    meQuery.then((result) => {      
      if(result.data.me != null){                      
        this.chatUser = result.data.me;

        console.log('UserChat from Me:')
        console.log(this.chatUser)
      }
    });

    return meQuery;
 }

  async createUserChat() {
    console.log('Creating user');

      var newUserMutation = API.graphql(graphqlOperation(mutations.createUser, {username: this.cognitoService.userAttributes['name']})) as Promise<any>;

      newUserMutation.then((result) => {
          console.log('New user created');                   
      });
      
      return newUserMutation;
  }

  async createConversation() {
    await API.graphql(graphqlOperation(mutations.createConversation, {id: this.order.serviceId, name : this.order.serviceId}))
    await API.graphql(graphqlOperation(mutations.createUserConversations, {conversationId: this.order.serviceId, userId: this.order.prestadora.prestadoraId }))
    await API.graphql(graphqlOperation(mutations.createUserConversations, {conversationId: this.order.serviceId, userId: this.cognitoService.getUserId() }))  
  }

  async loadMessages(){
     var messagesQuery = API.graphql(graphqlOperation(queries.allMessage, {conversationId: this.order.serviceId})) as Promise<any>;

     messagesQuery.then((result) => {
       this.conversationMessages = result.data.allMessage;
     });

  }


  async loadChat(){
    await this.getUserChat();

    if(this.chatUser == null){
      await this.createUserChat();
      await this.getUserChat();
    }
    
    var conversations = this.chatUser.conversations.userConversations.filter(function (value) { return value.conversationId == this  },this.order.serviceId);    

    if(conversations.length == 0){
       console.log('Conversation does not exist yet. Creating') 
       await this.createConversation();      
    }    

    this.loadMessages();
  }

  

  ngOnInit() {    

    //Initialiing Page
    this.order = this.router.getCurrentNavigation().extras.state.order;    
    this.loadChat();    
  }

  scrollToBottom() {
    this.content.scrollToBottom(100);
  }

  ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    console.log('scrollBottom');
    setTimeout(() => {
      this.scrollToBottom()
    }, 500)
    console.log('scrollBottom2');
  }

  logScrollStart(){
    console.log('logScrollStart');
    document.getElementById('chat-parent');
  
  }

  logScrolling(event){
    console.log('event',event)
  }

  

  sendMsg() {
    var newMessage = {
      content: this.inp_text,
      conversationId: this.order.serviceId,
      createdAt: (new Date()).toISOString()    
    }

    this.conversationMessages.push(newMessage);

    API.graphql(graphqlOperation(mutations.createMessage, newMessage));

  //   let otherUser;
  //   if (this.count === 0) {
  //     otherUser = this.arr[0].message
  //     this.count++
  //   }
  //   else if (this.count == this.arr.length) {
  //     this.count = 0;
  //     otherUser = this.arr[this.count].message
  //   }
  //   else {
  //     otherUser = this.arr[this.count].message;
  //     this.count++
  //   }

  //   this.msgList.push({
  //     userId: this.User,
  //     userName: this.User,
  //     userAvatar: "assets/user.jpeg",
  //     time: "12:01 pm",
  //     message: this.inp_text,
  //     upertext: this.inp_text
  //   })
  //   this.msgList.push({
  //     userId: this.toUser,
  //     userName: this.toUser,
  //     userAvatar: "assets/user.jpeg",
  //     time: "12:01 pm",
  //     message: otherUser,
  //     upertext: otherUser
  //   });
    this.inp_text = "";
    console.log('scrollBottom');
    setTimeout(() => {
      this.scrollToBottom()
    }, 10)
   }

}
