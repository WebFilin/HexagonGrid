![Image alt](https://github.com/WebFilin/HexagonGrid/blob/main/screenshot/screenshot_1.jpg)


# Hexagons Grid

## Технологии
* React 18
* Mobx
* SCSS

## Задача:

Реализовать интерфейс и логику средствами JavaScript, HTML, CSS (возможно использование фреймворков) по следующим требованиям - необходимо посчитать количество доменов в гексагональной решётке.

Ячейкам решётки м.б. присвоено значение 0 или 1. Если 2 ячейки, имеющие значение 1, имеют общую грань, то они входят в один домен.
В решётке, изображённой на рисунке можно определить 3 различных домена, отображённых на рисунке цветами. Подразумевается, что бесцветным ячейкам присвоено значение 0.

## Интерфейс:

Предложить пользователю ввод размера односвязной гексагональной области ( L,N,M<=30 - три поля ввода с валидацией, на примере L=3, M=5, N=7). После ввода размера отобразить (по отдельной кнопке) на странице пустую гексагональную решётку заданного размера с возможностью ручного ввода значений в ячейки (изменение 0\1 и наоборот щелчком мыши на ячейке).

Также реализовать автоматическое заполнение решётки по отдельной кнопке «АВТО» значениями 0 или 1 с предварительным указанием вероятности использования единицы (вероятность от 0,01 до 0,99) в отдельном поле ввода с валидацией. По нажатию кнопки «АВТО» также следует рассчитывать количество доменов и раскрашивать их.

## Результат работы:

Программа должна определять количество доменов в заданной решётке, ячейки которых имеют значение 1, (кнопка «Посчитать домены») и выделить цветом ячейки, входящие в домен. Цвета разных доменов должны отличаться. Предусмотреть поле для вывода количества доменов.

После каждого автоматического заполнения и расчета количества доменов в полученной решётке добавлять строку в таблице (внизу страницы) следующего вида:

![Image alt](https://github.com/WebFilin/HexagonGrid/blob/main/screenshot/table.jpg)

*неодносвязным является домен, обладающий нетривиальной фундаментальной группой, если рассматривать домен как топологическое пространство.

Ограничить количество строк результата в таблице значением 10. Т.е. при попытке вставить 11-ую строку стирается строка 1, происходит сдвиг строк вверх, данные записываются в последнюю строку.
