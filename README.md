### Bibliotecas

**react-navigation**: responsável pela navegação entre as telas da aplicação

**react-native-gesture-handler**: responsável pelos gestos executados pelo usuário como passar o dedo na tela arrastando pra cima, pra baixo, pro lado, etc. e poder ter algum tipo de ação.

PS: Sempre que utilizamos uma lib que precisa fazer alguma modificação no código nativo, é necessário utilizar `react-native link <biblioteca>`, então toda vez que instalarmos uma lib que faz essas modificações no código nativo, também precisamos rodar `react-native run-ios --simulator "iPhone Xs Max"` ou sem o `--simulator ...`.

**@react-native-community/async-storage**: responsável por guardar dados localmente do usuário, como o local storage da web.

**react-native-vector-icons**: responsável por colocar ícones na aplicação.

**react-native-vector-icons**: responsável por lidar com arquivos.

**react-native-image-picker**: responsável por fazer com que o usuário possa abrir a galeria e selecionar alguma foto.

**react-native-file-viewer**: responsável por abrir arquivos dentro da aplicação.

**react-native-iphone-x-helper**: responsável por calcular os espaçamentos
 da tela, principalmente para iPhone X, para ter o tamanho correto de cada espaçamento.
