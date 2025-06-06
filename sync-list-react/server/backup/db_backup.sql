PGDMP  8                    }           SyncList    16.4    16.4 0    $           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            %           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            &           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            '           1262    41928    SyncList    DATABASE     �   CREATE DATABASE "SyncList" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Ukrainian_Ukraine.1251';
    DROP DATABASE "SyncList";
                postgres    false            �            1259    41946    folders    TABLE     �   CREATE TABLE public.folders (
    id_folder integer NOT NULL,
    id_owner integer NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.folders;
       public         heap    postgres    false            �            1259    41945    folders_id_folder_seq    SEQUENCE     �   CREATE SEQUENCE public.folders_id_folder_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.folders_id_folder_seq;
       public          postgres    false    218            (           0    0    folders_id_folder_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.folders_id_folder_seq OWNED BY public.folders.id_folder;
          public          postgres    false    217            �            1259    42014    items    TABLE       CREATE TABLE public.items (
    id_item integer NOT NULL,
    id_purchase integer NOT NULL,
    id_claimed_by integer,
    completed boolean DEFAULT false NOT NULL,
    name character varying(100) NOT NULL,
    notes character varying(1000),
    image character varying(300)
);
    DROP TABLE public.items;
       public         heap    postgres    false            �            1259    42013    items_id_item_seq    SEQUENCE     �   CREATE SEQUENCE public.items_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.items_id_item_seq;
       public          postgres    false    223            )           0    0    items_id_item_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.items_id_item_seq OWNED BY public.items.id_item;
          public          postgres    false    222            �            1259    41974    members_in_purchases    TABLE     m   CREATE TABLE public.members_in_purchases (
    id_purchase integer NOT NULL,
    id_user integer NOT NULL
);
 (   DROP TABLE public.members_in_purchases;
       public         heap    postgres    false            �            1259    41958 	   purchases    TABLE     �   CREATE TABLE public.purchases (
    id_purchase integer NOT NULL,
    id_owner integer NOT NULL,
    id_folder integer,
    name character varying(100) NOT NULL,
    deadline date
);
    DROP TABLE public.purchases;
       public         heap    postgres    false            �            1259    41957    purchases_id_purchase_seq    SEQUENCE     �   CREATE SEQUENCE public.purchases_id_purchase_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.purchases_id_purchase_seq;
       public          postgres    false    220            *           0    0    purchases_id_purchase_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.purchases_id_purchase_seq OWNED BY public.purchases.id_purchase;
          public          postgres    false    219            �            1259    42038    user_sessions    TABLE     �   CREATE TABLE public.user_sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
 !   DROP TABLE public.user_sessions;
       public         heap    postgres    false            �            1259    41930    users    TABLE     q  CREATE TABLE public.users (
    id_user integer NOT NULL,
    first_name character varying(40) NOT NULL,
    last_name character varying(40) NOT NULL,
    username character varying(20) NOT NULL,
    email character varying(40) NOT NULL,
    password character varying(70) NOT NULL,
    profile_picture character varying(300) DEFAULT 'no-profile-picture.jpg'::character varying,
    CONSTRAINT proper_email CHECK (((email)::text ~* '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}(\.[a-zA-Z0-9-]+)*$'::text)),
    CONSTRAINT proper_first_name CHECK (((first_name)::text ~* '^(?!.*[ ''\-]{2})[A-Za-zÀ-ÖØ-öø-ÿ''’\- ]{2,30}$'::text)),
    CONSTRAINT proper_last_name CHECK (((last_name)::text ~* '^(?!.*[ ''\-]{2})[A-Za-zÀ-ÖØ-öø-ÿ''’\- ]{2,30}$'::text)),
    CONSTRAINT proper_username CHECK (((username)::text ~* '^[a-zA-Z][a-zA-Z0-9_]{2,14}[a-zA-Z0-9]$'::text))
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    41929    users_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_id_user_seq;
       public          postgres    false    216            +           0    0    users_id_user_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;
          public          postgres    false    215            i           2604    41949    folders id_folder    DEFAULT     v   ALTER TABLE ONLY public.folders ALTER COLUMN id_folder SET DEFAULT nextval('public.folders_id_folder_seq'::regclass);
 @   ALTER TABLE public.folders ALTER COLUMN id_folder DROP DEFAULT;
       public          postgres    false    217    218    218            k           2604    42017    items id_item    DEFAULT     n   ALTER TABLE ONLY public.items ALTER COLUMN id_item SET DEFAULT nextval('public.items_id_item_seq'::regclass);
 <   ALTER TABLE public.items ALTER COLUMN id_item DROP DEFAULT;
       public          postgres    false    223    222    223            j           2604    41961    purchases id_purchase    DEFAULT     ~   ALTER TABLE ONLY public.purchases ALTER COLUMN id_purchase SET DEFAULT nextval('public.purchases_id_purchase_seq'::regclass);
 D   ALTER TABLE public.purchases ALTER COLUMN id_purchase DROP DEFAULT;
       public          postgres    false    219    220    220            g           2604    41933    users id_user    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN id_user DROP DEFAULT;
       public          postgres    false    216    215    216                      0    41946    folders 
   TABLE DATA           <   COPY public.folders (id_folder, id_owner, name) FROM stdin;
    public          postgres    false    218   <                  0    42014    items 
   TABLE DATA           c   COPY public.items (id_item, id_purchase, id_claimed_by, completed, name, notes, image) FROM stdin;
    public          postgres    false    223   t<                 0    41974    members_in_purchases 
   TABLE DATA           D   COPY public.members_in_purchases (id_purchase, id_user) FROM stdin;
    public          postgres    false    221   lA                 0    41958 	   purchases 
   TABLE DATA           U   COPY public.purchases (id_purchase, id_owner, id_folder, name, deadline) FROM stdin;
    public          postgres    false    220   �A       !          0    42038    user_sessions 
   TABLE DATA           :   COPY public.user_sessions (sid, sess, expire) FROM stdin;
    public          postgres    false    224   HB                 0    41930    users 
   TABLE DATA           k   COPY public.users (id_user, first_name, last_name, username, email, password, profile_picture) FROM stdin;
    public          postgres    false    216   �B       ,           0    0    folders_id_folder_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.folders_id_folder_seq', 5, true);
          public          postgres    false    217            -           0    0    items_id_item_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.items_id_item_seq', 31, true);
          public          postgres    false    222            .           0    0    purchases_id_purchase_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.purchases_id_purchase_seq', 5, true);
          public          postgres    false    219            /           0    0    users_id_user_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_id_user_seq', 16, true);
          public          postgres    false    215            x           2606    41951    folders folders_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.folders
    ADD CONSTRAINT folders_pkey PRIMARY KEY (id_folder);
 >   ALTER TABLE ONLY public.folders DROP CONSTRAINT folders_pkey;
       public            postgres    false    218            ~           2606    42022    items items_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id_item);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    223            |           2606    41978 .   members_in_purchases members_in_purchases_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.members_in_purchases
    ADD CONSTRAINT members_in_purchases_pkey PRIMARY KEY (id_purchase, id_user);
 X   ALTER TABLE ONLY public.members_in_purchases DROP CONSTRAINT members_in_purchases_pkey;
       public            postgres    false    221    221            z           2606    41963    purchases purchases_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id_purchase);
 B   ALTER TABLE ONLY public.purchases DROP CONSTRAINT purchases_pkey;
       public            postgres    false    220            �           2606    42044    user_sessions session_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 D   ALTER TABLE ONLY public.user_sessions DROP CONSTRAINT session_pkey;
       public            postgres    false    224            r           2606    41944    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            t           2606    41940    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            v           2606    41942    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216                       1259    42045    IDX_session_expire    INDEX     P   CREATE INDEX "IDX_session_expire" ON public.user_sessions USING btree (expire);
 (   DROP INDEX public."IDX_session_expire";
       public            postgres    false    224            �           2606    41952    folders folders_id_owner_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.folders
    ADD CONSTRAINT folders_id_owner_fkey FOREIGN KEY (id_owner) REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.folders DROP CONSTRAINT folders_id_owner_fkey;
       public          postgres    false    218    4724    216            �           2606    42028    items items_id_claimed_by_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_id_claimed_by_fkey FOREIGN KEY (id_claimed_by) REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE RESTRICT;
 H   ALTER TABLE ONLY public.items DROP CONSTRAINT items_id_claimed_by_fkey;
       public          postgres    false    4724    223    216            �           2606    42023    items items_id_purchase_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_id_purchase_fkey FOREIGN KEY (id_purchase) REFERENCES public.purchases(id_purchase) ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public.items DROP CONSTRAINT items_id_purchase_fkey;
       public          postgres    false    220    4730    223            �           2606    41979 :   members_in_purchases members_in_purchases_id_purchase_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.members_in_purchases
    ADD CONSTRAINT members_in_purchases_id_purchase_fkey FOREIGN KEY (id_purchase) REFERENCES public.purchases(id_purchase) ON UPDATE CASCADE ON DELETE RESTRICT;
 d   ALTER TABLE ONLY public.members_in_purchases DROP CONSTRAINT members_in_purchases_id_purchase_fkey;
       public          postgres    false    221    4730    220            �           2606    41984 6   members_in_purchases members_in_purchases_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.members_in_purchases
    ADD CONSTRAINT members_in_purchases_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE RESTRICT;
 `   ALTER TABLE ONLY public.members_in_purchases DROP CONSTRAINT members_in_purchases_id_user_fkey;
       public          postgres    false    4724    216    221            �           2606    41969 "   purchases purchases_id_folder_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_id_folder_fkey FOREIGN KEY (id_folder) REFERENCES public.folders(id_folder) ON UPDATE CASCADE ON DELETE RESTRICT;
 L   ALTER TABLE ONLY public.purchases DROP CONSTRAINT purchases_id_folder_fkey;
       public          postgres    false    218    4728    220            �           2606    41964 !   purchases purchases_id_owner_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_id_owner_fkey FOREIGN KEY (id_owner) REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.purchases DROP CONSTRAINT purchases_id_owner_fkey;
       public          postgres    false    220    4724    216               G   x�3�4�H-*��K��2r�󋲹�9�8]�R�J��L�L���T������d��)PĿ�$%?��+F��� zWg          �  x�UU˒�6]�_���咄h��d�̫�'��j6&M#D�{�*ߐ/˕�'��)qu�9�q����C�bt��\�hp��a£��	^��=�~4��_L;�ɭ��������#���0�x����Ⳟ�q�ؼ�E7���"����U�ֺŬ��ۥ�O<tPk]�z4cH ��  �9�+��cq�������v����ʵ�竇g�`���ŝ��h.�L�s%b"��,�	)r��3WQQ��_s�1P�=c�/���|!.)t��G��7�|';#'3(�tL�&f$�� �h5�q�ԑ:]M=�]�������%l;|=�2@�Ӝ����炈��$M�d�Le��2�ʽ��*.Ƭ�?��+�)`�G�<�t�@�B?������#9�*b�dYYQ护eU�Fe^�4+��������;���4����d�xM;J����;�I�H֍�B���,'�ƃ[>A�(7�������K)��P�,-��qEҘG$a� �W%�1_�W|�� �g=�Ŏ#���aj.�:�`�4��I2	�D��$�Ei�%U��j/��P��dk�,	�J�b��п�C�hMc��z�ٳZ<jg^p�9��,�`���ⲬXA����K�	���(�,�UqӖ�i`��3d����~��a����g-�bmw�����@�F���j���@'~@����_A�{'�it:��t��2���nƭ�,��}���^�Ǔo�,���e�*I�"�*
��A��%K�9o�(��^�[���ru��ݬ�E`���Ͻ��
V΀�_��}�G���K�tC�0�fvC�'GDC���.��p4J��V���ր������$iM"L��Dߐ�[��ј�/���>_-8�	r������7 �w�'י'�\;����:ye����������{�`O����6�3��Ԡ�$�[�y�,T�Q3ݦj��{r�u��}�2����,�x�����P�?�b_�@jc�m����PP Pn���s���g��u��T��չJ�*O���c�#��;6̉��m�M1tp-4?V�)��E��u�&(������@���ugH�ޮ�n;E�k�q�����~��̬ۻ��I�]���c=E,Lߟ���~Z��l�0t��>���m[���w�Z�I�Du1�)QiKD�5�5�$���&n}<���Pʡ�@|o�/4�*o��x�����G����p����p��aY�         *   x�3�4�2�4bC.cN.NS 6bC.S��)������ g��         �   x�=ν� ��s�0��ϪCu0����Ӗ��hһWk��{�O�U��p���C�n�Q�J��J�ťm]�X�b?�����ޥ�?h�+�<�)�����
V�8�x�1�)�0�2'GÜn�Q`Eq _�`Ŕ~�N*� | ��/�      !   �   x�5��
�  ��|���ZN[4o;E�m��AȒ)�3�`��{]:~��iz6�6�[G\v�]�/�o9y+���2
�
s0�q�v27�o\�������c�1$��˨A�6iQ��Qn��"�"��ʳ���Gt�#��­,~         )  x�u�˒�8@��;�jV $��nx�@E��vM�T�$
��o�����h{6�I����������Y	�-B� >{�INx�+�-���(|LFm�*['�������4U�n����"�Ԏ�ج��g�B�L�HT�A2'Z��I�,r*D�:�R	J����.�@`�̶������O���kT���h�=:��~��5�Oq:���̃�������1���h���Q:���Aɸ]�6� ܎F��"����0���Z��x�#��+�Z�*yZ\D��x{!��4�(V��S(Y~�r�`�����f��=9},��;� ��!���������e�G�B��d>a��f�iq��C:ϩ���ؐ&���)�f��5SR9�'9��i�!p�h��l@�6�U�$Q��.rR=z����J�^����!��Y����a�F���˖t�M�M'�h��;аH���z�!�r��J�}}��2��+p�s���i����xp����C�r�jA9٪�	��5\�6����%i{�o������&���b8>�A2kT�f�u��J<��q��[�<���|�Uv������Zi��qC��o�+��C��K�/-�/�h�BÈ'����YX�t*SG,�^6Pz
5��NW$�IP���"�˱(����I��|����k\�2<g?۫��ݳv��c5�r��]��	�x7ƥ��~��`-|ţ)���v���	�W%`L﵈��	�
6�N��e΃�wc۷�2�$+��>�U����n�f*��m��w:�� pW�     