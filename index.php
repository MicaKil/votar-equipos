<html>
    <head>
        <link href="style_sheet.css" rel="stylesheet"> </link>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="check.js"></script>
    </head>

    <body>
        <img src="LogoUNCuyo.png" alt="Logo UNCUYO" class="center">

        <h1>¡Vote su Equipo Favorito!</h1>

        <form name="teams" id="teams" onsubmit="return check_ans() && sendVote();" method="POST">

            <label for="email" class="email-label">Escriba su e-mail:</label>
            <input type="txt" id="email" name="email" class="email-input"> <!--type=email -->
            <table>
                <tr>
                    <td>
                        <input type="radio" name="equipo" id="river" value="0">
                        <label for="river">River Plate</label>
                    </td>
                    <td>
                        <img src="escudos/river.png" height="40">
                    </td>
                    <td>
                        <span id="votes_0">0</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name="equipo" id="boca" value="1">
                        <label for="boca">Boca Juniors</label>
                    </td>
                    <td>
                        <img src="escudos/boca.png" height="40">
                    </td>
                    <td>
                        <span id="votes_1">0</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name="equipo" id="san_lorenzo_id" value="2">
                        <label for="san_lorenzo_id">San Lorenzo</label>
                    </td>
                    <td>
                        <img src="escudos/sanlorenzo.png" height="40">
                    </td>
                    <td>
                        <span id="votes_2">0</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <!--Nota: Harpo cedió sus derechos de autor al equipo -->
                        <input type="radio" name="equipo" id="la_harponeta_id" value="3">
                        <label for="la_harponeta_id">La Harponeta</label>
                    </td>
                    <td>
                        <img src="escudos/la_harponeta.jpg" height="40">
                    </td>
                    <td>
                        <span id="votes_3">0</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name="equipo" id="tomba_id" value="4">
                        <label for="tomba_id">Tomba</label>
                    </td>
                    <td>
                        <img src="escudos/tomba.png" height="40">
                    </td>
                    <td>
                        <span id="votes_4">0</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name="equipo" id="otro_id" value="5">
                        <label for="otro_id">Otro</label>
                    </td>
                    <td>
                    </td>
                    <td>
                        <span id="votes_5">0</span>
                    </td>
                </tr>
            </table>

            <input type="submit" id="submitButton" value="Enviar">
        </form>

        <script src="ws_client.js"></script>
    </body>
</html>