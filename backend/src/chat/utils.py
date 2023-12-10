from .models import ChatRoom
import random
import string


def generate_unique_user_id():
    # Define the length of the user ID
    id_length = 5

    while True:
        # Generate a random string of alphanumeric characters
        user_id = "".join(
            random.choices(string.ascii_uppercase + string.digits, k=id_length)
        )

        # Check if the generated user ID already exists (you would replace this with your actual check)
        exists = ChatRoom.objects.filter(member1=user_id) or ChatRoom.objects.filter(member2=user_id).exists()

        if not exists:
            return user_id