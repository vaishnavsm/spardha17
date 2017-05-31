from django.db import models

class Player(models.Model):
    PlayerID=models.IntegerField(primary_key=True)
    PlayerName=models.CharField(max_length=40)
    PlayerImage=models.ImageField(blank=True,null=True)
    CollegeID=models.IntegerField()
    Email=models.EmailField()
    PhoneNumber=models.CharField(max_length=10,blank=True,null=True)

class Team(models.Model):
    TeamID=models.IntegerField(primary_key=True)
    CoachName=models.CharField(max_length=40)
    CollegeID=models.IntegerField()
    LeaderID=models.IntegerField(blank=True,null=True)

class Event(models.Model):
    EventID=models.IntegerField(primary_key=True)
    EventName=models.CharField(max_length=25)
    Venue=models.TextField(max_length=300,blank=True,null=True)
    EventDateTime=models.DateTimeField(blank=True,null=True)
    MinPlayersReq=models.IntegerField(default=1)
    MaxPlayersReq=models.IntegerField(default=100)

class Notification(models.Model)
    NotificationID=models.IntegerField(primary_key=True)
    NotificationText=models.CharField(max_length=200)
    Priority=models.IntegerField(default=1,blank=True)
    IsPersistent=BooleanField(default=False,blank=True)
    AimedEventID=models.IntegerField(blank=True,null=True)
