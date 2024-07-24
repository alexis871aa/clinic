-   база данных на json-server
-   эмулятор BFF (backend for frontend). Он будет выступать в роли посредника между сервером и клиентом, но также должен находиться на сервере, на нём тоже могут содержаться какие то данные и обрабатываться
-   redux store. В нём будут храниться состояния приложения
-   место это будет одно из этих трёх вышеназванных
    Что такое сущности и о чём речь? Это какие то информационные единицы, основополагающие, с которыми работает приложение
    Сущности:
-   пользователь: БД (список пользователей), BFF (сессия текущего пользователя), redux store (отображать пользователя в браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), redux store (использование роли пользователя на клиенте для отображения тех или иных кнопок)
-   статья: БД (список статей), BFF (не используется в сессии пользователя), redux store (отображение в браузере)
-   комментарий: БД (список комментариев), BFF (не используется в сессии пользователя), redux store (отображение в браузере)
Определяем таблицы БД и их схемы.
-   пользователи - users: id / login / password / registed_at / role_id
-   роли - roles: id / name
-   статьи - posts: id / title / image_url / content / published_at
-   комментарии - comments: id / author_id / post_id / content /  published_at

Схема состояния на BFF (подразумевается перечень данных, которые мы там должны хранить).
-   сессия текущего пользователя: login / password / role

Cхема для Redux Store (на клиенте).
-   user: id / login / role / session
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users: массив user: id / login / registedAt / roleId
=======
Определяем таблицы БД и их схемы:

-   пользователи - users: id / login / password / registed_at / role_id
-   роли - roles: id / name
-   статьи - posts: id / title / image_url / content / published_at
-   комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF (подразумевается перечень данных, которые мы там должны хранить):

-   сессия текущего пользователя: login / password / role

Cхема для Redux Store (на клиенте):

-   user: id / login / role
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users: массив user: id / login / registed_at / role