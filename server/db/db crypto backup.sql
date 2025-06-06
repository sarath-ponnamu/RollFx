PGDMP  +    -                }            crypto    17.4    17.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16411    crypto    DATABASE     l   CREATE DATABASE crypto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE crypto;
                     postgres    false            �            1259    16412    member    TABLE       CREATE TABLE public.member (
    id bigint NOT NULL,
    membername text NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    parentid bigint NOT NULL,
    side bit(1) NOT NULL,
    is_verified boolean,
    verification_token text,
    is_active boolean DEFAULT false NOT NULL,
    createdby bigint,
    createdon timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    parentname text,
    createdbyname text,
    role text DEFAULT 'user'::text NOT NULL,
    activationhstory text
);
    DROP TABLE public.member;
       public         heap r       postgres    false            �            1259    16430    member_id_seq    SEQUENCE     �   ALTER TABLE public.member ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.member_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    217            �            1259    16445 
   profitclub    TABLE     �   CREATE TABLE public.profitclub (
    id bigint NOT NULL,
    releasedate timestamp without time zone NOT NULL,
    amount numeric(10,2) NOT NULL
);
    DROP TABLE public.profitclub;
       public         heap r       postgres    false            �            1259    16448    profitclub_id_seq    SEQUENCE     �   ALTER TABLE public.profitclub ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profitclub_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    219            �            1259    16471    withdrawals    TABLE     �   CREATE TABLE public.withdrawals (
    id bigint NOT NULL,
    userid bigint NOT NULL,
    date date NOT NULL,
    amount numeric(10,2) NOT NULL
);
    DROP TABLE public.withdrawals;
       public         heap r       postgres    false            �            1259    16470    withdrawals_id_seq    SEQUENCE     �   ALTER TABLE public.withdrawals ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.withdrawals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    222            �          0    16412    member 
   TABLE DATA           �   COPY public.member (id, membername, email, username, password, parentid, side, is_verified, verification_token, is_active, createdby, createdon, parentname, createdbyname, role, activationhstory) FROM stdin;
    public               postgres    false    217   �       �          0    16445 
   profitclub 
   TABLE DATA           =   COPY public.profitclub (id, releasedate, amount) FROM stdin;
    public               postgres    false    219   ?                  0    16471    withdrawals 
   TABLE DATA           ?   COPY public.withdrawals (id, userid, date, amount) FROM stdin;
    public               postgres    false    222   �                  0    0    member_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.member_id_seq', 117, true);
          public               postgres    false    218                       0    0    profitclub_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.profitclub_id_seq', 4, true);
          public               postgres    false    220            	           0    0    withdrawals_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.withdrawals_id_seq', 11, true);
          public               postgres    false    221            e           2606    16425    member member_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.member DROP CONSTRAINT member_pkey;
       public                 postgres    false    217            g           2606    16453    profitclub profitclub_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.profitclub
    ADD CONSTRAINT profitclub_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.profitclub DROP CONSTRAINT profitclub_pkey;
       public                 postgres    false    219            i           2606    16475    withdrawals withdrawals_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.withdrawals DROP CONSTRAINT withdrawals_pkey;
       public                 postgres    false    222            �   T  x���[s�J��ɯ�C^C��[��x��(5U)PT�\Q���h�If2U�����ַ�ڻ!a扟�7gaY�v��/�p�d��8��&�� �ó��L�����J�	�q�t���Z?�1�v��%�E%z���z��o��A 1��~��= 7(XoW���~kw�8������%�/��^癟�� �3عD��n�΂կE��S��7}�Y^WMth[ӞMW[��ڌ:����<�t��I�]�#�$OvH@�T���w���d"1F�OE��}�;����x,�z}�)2�8���׾�Us��������ȝ�V�yc�i贘NR�pU!�i�i�.'� q�yv;�D��CW{[�f�(���v�'�������}�v�+T&��}mHU�+K Հ�(����ꖷ*إ���w�{��J�[�����0�4/f$��4#��g�mj3���.�x�/m�T��*;&! :���
{9�^�Y#Ȣ/�Ǜ0)�>?$�n����I۴�5�h���3�-䡥qOb%��yQ��&�*��s�/1+M	�RmKl���'P��:4�bxn�[3�%|L�%~�kg�|&�Ҫp4�ȵu4R8)�Ag�A��K�Z��"��OI���y�}P��Aij�XR�j.��>\.�|4Y!�_�"ܠy����n��;�/̑�����T��]��e?�I]�M�=��0]���)�h��
U�A��Ev28ɲ/���e���䛽��$���5S�Ib�Wf�b�+�p_�m��V��2j����b����9����s(�J���|����ak�-G'���ۼ��,U�K���A���*Lό��֪�7U�n��]��Y��������0��m�@�Y�Η
����N[�s���
��2~v��|��bŔ�)�Fu3����F4��+6�r=+ֲU��q�~�%r������ox�N>����m�_�n�'o��x�&��t`;U�d+�Õ�م	��J���8�u��6��u��u���X����R�U�'����x���2X���Y��}��G�zBWW;�Hb�r���7yww����3      �   9   x�3�4202�50�5�T04�22�20�33�440�30�2" o�K�"oB@>F��� =u�          T   x�m�A
�0Dѵ�%�1ڤw���Q��d�>�TԛX�I&]����E�82z�ea���򪺷����cᮊP���qW���/�'l     