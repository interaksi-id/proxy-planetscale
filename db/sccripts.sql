create table performer (
    id varchar(24) not null,
    created_date date not null,
    name varchar(1000) not null,
    link varchar(1000) not null,
    service_category varchar(100) not null,
    is_active bit not null,
    client_english_leavel varchar(1000) null,
    english_type varchar(1000) null,
    design_type varchar(1000) null,
    phone varchar(100) null,
    constraint performer_pk primary key (id)    
)


create table request (
    id varchar(24) not null,
    client_phone varchar(100) not null,
    client_email varchar(100) null,
    created_date date not null,
    service_category varchar(1000) not null,
    refferal_url varchar(5000) null,
    status int not null,
    link varchar(1000) null,
    amount varchar(1000) null,
    assigned_manager varchar(1000) null,
    type int not null,
    constraint order_pk primary key (id)
)

create table request_status_history (
    request_id varchar(24) not null,
    datetime datetime not null,
    status int not null
)

create table performer_interaction_with_request (
    request_id varchar(24) not null,
    performer_id varchar(24) not null,
    datetime datetime not null,
    action int not null
)