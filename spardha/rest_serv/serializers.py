from rest_framework import serializers
from .models import *
 
class CollegeSerializer(serializers.ModelSerializer):
    CollegeName = serializers.CharField(read_only=False)
    class Meta:
        model=College
        fields='__all__'
    
 
class PlayerSerializer(serializers.ModelSerializer):
     CollegeRef = CollegeSerializer(read_only=True)
     PlayerID = serializers.CharField(read_only=True)
     class Meta:
         model=Player
         fields=('PlayerID','PlayerName','CollegeRef','Email','PhoneNumber')
         extra_kwargs = {'PlayerID':{'read_only':True,'required':False},'PlayerName':{'read_only':False},'PlayerID':{'read_only':False},
                        'Email':{'read_only':False},'CollegeRef':{'read_only':True}}
 		
 		
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model=Event
        fields='__all__'
        extra_kwargs = {'EventID':{'read_only':True},'EventName':{'read_only':True},'Venue':{'read_only':True},
                        'EventDateTime':{'read_only':True},'MinPlayersReq':{'read_only':True},'MaxPlayersReq':{'read_only':True}}

class TeamSerializer(serializers.ModelSerializer):
    #  CollegeID = serializers.IntegerField(source="CollegeRef.CollegeID",read_only=True)
    #  CollegeName = serializers.IntegerField(source="CollegeRef.CollegeName",read_only=True)
    #  LeaderID = serializers.CharField(source="Leader.PlayerID",read_only=True)
    #  EventID = serializers.CharField(source="Event.EventID",read_only=True)
    EventRef = EventSerializer(read_only=True)
    CollegeRef = CollegeSerializer(read_only=True)
    Leader = PlayerSerializer(read_only=True)
    Members = PlayerSerializer(read_only=True, many=True)
    class Meta:
        model=Team
        fields='__all__'
        extra_kwargs = {'TeamID':{'read_only':True},'CoachName':{'read_only':False},'CollegeRef':{'read_only':True},
                        'Leader':{'read_only':True},'Members':{'read_only':True},'EventRef':{'read_only':True}}
 		
class PersistentNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=PersistentNotification
        fields='__all__'
        extra_kwargs = {'NotificationID':{'read_only':True},'NotificationText':{'read_only':False},
                        'Priority':{'read_only':False}}
 		
class UserNotification(serializers.ModelSerializer):
    UserToNotify = PlayerSerializer(read_only=True)
    class Meta:
        model=UserNotification
        fields='__all__' 
        extra_kwargs = {'NotificationID':{'read_only':True},'NotificationText':{'read_only':False},
                        'Priority':{'read_only':False},'UserToNotify':{'read_only':True}}
