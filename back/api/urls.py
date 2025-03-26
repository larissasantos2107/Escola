from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Professores

    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('professor/<int:pk>', ProfessoresDetailView.as_view()),
    path('professor', ProfessoresDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Disciplinas

    path('disciplina', DisciplinaView.as_view()),
    path('disciplina/<int:pk>', DisciplinaDetailView.as_view()),

    # Turma

    path('turma', TurmaView.as_view()),
    path('turma/<int:pk>', TurmaDetailView.as_view()),

    # Ambiente

    path('sala', AmbienteView.as_view()),
    path('sala/<int:pk>', AmbienteDetailView.as_view()),
    path('periodo_choices', get_periodo_choices),


    # Cursos

    path('curso', CursoView.as_view()),
    path('curso/<int:pk>', CursoDetailView.as_view()),
    path('tipo_curso_choices', get_tipo_curso_choices),
    
   
]

