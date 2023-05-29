<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="{{ asset('css/app.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/materialize.min.css') }}">
 
</head>

<body>
    <div class="row container ">
        <div class="col s12 table">
            <div class="logo-discografia">
                <div class="col s6"> <img src="{{ asset('image/logo.png') }}" alt=""></div>
                <div class="col s6 textDiscografia"><span>Discografia</span></div>
            </div>

            <div class="search-container">
                <input style="background-color: white;border-radius: 30px;padding-left: 25px;" type="text" name="busca" placeholder="Pesquise por album ou por faixa" id="busca">
                <button id="procurar" onclick="seach(busca.value)" type="submit">Procurar</button>
            </div>
            <div id="tabela">
                
            </div>
            <div onclick="cad()" class="fixed-action-btn">
                <a class="btn-floating btn-large green">
                    <i class="large material-icons">add</i>
                </a>
            </div>
            
          

        </div>
    </div>
    <script src="{{ asset('js/sweetalert2.min.js') }}"></script>
    <script src="{{ asset('js/script.min.js') }}"></script>
   
</body>

</html>