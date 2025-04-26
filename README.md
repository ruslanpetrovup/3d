auth

    -registration
        email
        password

    *если есть такой email, то отправляется ошибка, а если нет, то отправляется аккаунт в ожидание*
    **отправляется аккаунт в ожидание**(на почту приходит код)

    *регистрация через Google or Apple or Facebook*

    -verify
        email
        code
    *если такой email нет, то отправляется ошибка, а если есть, то проверяется код*
    **проверяется код**(аккаунт активируется)

    -login
        email
        password
    *если такой email нет, то отправляется ошибка, а если есть, то проверяется пароль*
    **проверяется пароль**(логинится и отправляется токен)

    -forgot
        email
    *отправляется код на почту*
    **отправляется код на почту**(на почту приходит код)

    -reset
        email
        code
        password
    *если такой email нет, то отправляется ошибка, а если есть, то проверяется код и сбрасывается пароль*
    **проверяется код и сбрасывается пароль**(логинится и отправляется токен)

links

    -create-link
        upload-file(видео, фото, pdf, xlsx, doc, ppt и цена за файл)
        price
        **создается объект(id, user_id, link, price,date,view,earnings)**
    
    -list-links
    -details-link
        id
    -change-link
        id
        upload-file(видео,музыка, фото, pdf, xlsx, doc, ppt и цена за файл)
        price
    -delete-link
        id
    -buy-link
        productId
        clientId
    -viewing-link
        productId
        clientId

user

    -verify
        -scan-document
            *сканируется документ*
        -scan-face
            *сканируется лицо*

    -settings
        -change-pass
            current-password
            new-password
        -change-personal
            first-name
            last-name
            email

    -payment
        -list-cards
        -add-card
            card-name
            card-number
            card-exp
            card-cvc
            country-or-region
            zip
        -change-card
            id
            card-name
            card-number
            card-exp
            card-cvc
            country-or-region
            zip
        -delete-card
            id
    -delete-account

wallet

    -info-wallet
    -list-transactions
    -details-transaction
        id
    -create-transaction
        amount
        method
        description

admin

    -transactions
        -list-transactions
        -details-transaction
            id
        -confirm-transaction
            id
    -users
        -ban-user
            id
        -unban-user
            id
    -statistics
        -day
        -week
        -month
        -year
