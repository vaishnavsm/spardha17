from django.db import models

class College(models.Model):
    CollegeID=models.AutoField(primary_key=True,editable=False)
    CollegeName=models.CharField(max_length=40,unique=True,editable=False)
    Players=models.ManyToManyField(Player,on_delete=models.CASCADE,blank=True,null=True)

class Player(models.Model):
    PlayerID=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    PlayerName=models.CharField(max_length=40)
    PlayerImage=models.ImageField(blank=True,null=True)
    CollegeID=models.ForeignKey(College,on_delete=models.CASCADE,blank=True,null=True)
    Email=models.EmailField()
    PhoneNumber=models.CharField(max_length=15,blank=True,null=True)

class Team(models.Model):
    TeamID=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    CoachName=models.CharField(max_length=40,blank=True,null=True)
    CollegeID=models.ForeignKey(College,on_delete=models.CASCADE,blank=True,null=True)
    Leader=models.ForeignKey(Player, on_delete=models.CASCADE,blank=True,null=True)
    Members=models.ManyToManyField(Player,on_delete=models.CASCADE)
    Event=models.ForeignKey(Event,on_delete=models.CASCADE)

class Event(models.Model):
    EventID=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    EventName=models.CharField(max_length=25)
    Venue=models.TextField(max_length=300,blank=True,null=True)
    EventDateTime=models.DateTimeField(blank=True,null=True)
    MinPlayersReq=models.IntegerField(default=0)
    MaxPlayersReq=models.IntegerField(default=0)
    RegisteredTeams=models.ManyToManyField(Team,on_delete=models.CASCADE,blank=True,null=True)
    RegisteredPlayers=models.ManyToManyField(Player,on_delete=models.CASCADE,blank=True,null=True)

class PersistentNotification(models.Model)
    NotificationID=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    NotificationText=models.CharField(max_length=200)
    Priority=models.IntegerField(default=1,blank=True)
    
class UserNotification(models.Model)
    NotificationID=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    NotificationText=models.CharField(max_length=200)
    Priority=models.IntegerField(default=1,blank=True)
    UserToNotify=models.ForeignKey(Player,on_delete=models.CASCADE)
    
