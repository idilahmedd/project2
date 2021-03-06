# Project 2

KidConnect is an app that is created for parents and guardians of children with Developmental Delays and/or Autism. It's a place where users can keep track of events such as doctor appointments or playdates and keep notes on appointments with doctors and thearpists. Users are able to have one place to go to keep track of all things related to the progress of their child.

## Getting Started

Going into project 2, I knew I wanted to make an app that was in a way personal to me and that I was passionate about. I have a beautiful 3 year old with a speech delay and wanted to make an app that would be of use for other parents and childern. I wanted my app to have a way that the user could have a home page that renders some useful information/ helpful open forum where users can input information for all to see. I also wanted users to be able create a profile with their information and login to see their content. 

On the profile page, it would just list the up coming events for that user's children and allow them to view or update that information. I wanted a child/children page to create children and update thier information. I also wanted a main events page where users can create events based on whether they are doctor's appointments or playdates.

In the events page, users are able to select which type of event, and based on the selection they will get to choose more items for that event. In the end of that chain, the user should be able to connect the choosen items and attach them to the event they were creating. I also would like a notes page so that user's can keep track of notes and little todo's about each event.


## Creating the models and wireframe
Knowing that I needed these types of pages, I started on drawing the types of models and their associations to get a better picture of how the data should flow. I also needed to visually draw out the way my page layouts should be.

![image](https://user-images.githubusercontent.com/50806842/60863094-628c2080-a1d4-11e9-94b7-ec1cf05d779f.png)



## Searching for the Api
Finding the right type of api for my project was a hassel because having to deal with anything healthcare related, you need to at most times go through HIPPA and that can be a pain. Early on, I was able to find BetterDoc Api and it looked like it had the basic data that could be useful for finding doctors information. The only little hicupp I had at the begining of trying to use the api was figuring out what info I wanted to use and where I was going to extract that data. 


<img width="733" alt="Screen Shot 2019-07-09 at 8 48 10 AM" src="https://user-images.githubusercontent.com/50806842/60903517-5761e080-a226-11e9-881c-edf443a769d8.png">


## Setting up the app 
In setting up the app, I initially had a relatively easy time setting up my routes. The routes to my kids/profile/and notes pages were easy to figure out. When I got to my events route, I realized that the meat of my app would run from this page so I would need multiple routes in here along with both my doctor api and mapbox routes. 




## Adding Mapbox
I used mapbox to pull up park locations for playdates when user's want to create playdates.

<img width="656" alt="Screen Shot 2019-07-09 at 8 43 20 AM" src="https://user-images.githubusercontent.com/50806842/60903222-c7239b80-a225-11e9-9f7d-23d392aa2985.png">



## Styling

I am currently still working on styling using bootstrap which is still new to me.


## Conclusion


#### Moving Forward
