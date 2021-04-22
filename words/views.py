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
    tokens = Token.objects.filter(accounts__id__contains=request.user.id)
    context = {
        "num_tokens": Token.objects.count(),
        "tokens": tokens
    }
    return render(request, 'index.html', context=context)


@login_required
def show_token(request, pk):
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
        token = Token.objects.get(pk=pk)
        if token in Token.objects.filter(accounts__id__contains=request.user.id):
            if not token.key: # Generate token key if it doesnt exist
                token.key = token_bytes(16)
                token.save()

            #
            context = {
                "name": token.title,
                "key": json.dumps(list(token.key))
            }

            return render(request, 'token.html', context=context)
        else:
            raise Http404('Token not found') # Probably should be a 403 but leaving it ambiguous..

    except Token.DoesNotExist:
        raise Http404('Token not found')
