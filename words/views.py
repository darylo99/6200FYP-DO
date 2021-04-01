from django.shortcuts import render
from .models import Token
from django.http import Http404
from django.contrib.auth.decorators import login_required
from secrets import token_bytes
import json

# Create your views here.
@login_required
def index(request):
    """
        View function for index page
         Get Tokens linked to user
         Count them
         Render template and pass context

    """
    tokens = Token.objects.filter(account__exact=request.user.id)
    num_tokens = tokens.count()
    context = {
        "num_tokens": num_tokens,
        "tokens": tokens
    }
    render(request, 'index.html', context=context)


@login_required
def show_token(request, token_id):
    """
        View function to get token key
        request: HTTP request
        token_id: int value taken from url -> token PK

        Try to get the token with id token_id
        Check if it is associated to the user's account
        Generate key if it isn't available
        Render details
    """
    try:
        token = Token.objects.get(pk=token_id)
        if token.account != request.user.id:
            raise Http404('Token does not belong to this account') # !!!!!!!!!!!!!!!!!! CHANGE
        else:
            if not token.key: # Generate token key if it doesnt exist
                token.key = token_bytes(16)
                token.save()

            context = {
                "name": token.title,
                "key": json.dumps(list(token.key))
            }

            render(request, 'token.html', context=context)

    except Token.DoesNotExist:
        raise Http404('Token does not exist')
