	C	**********************************************************************
	C	*	TOKOS-������ �����
	�	**********************************************************************
0001		DIMENSION A(20.20),U0(10),B(20,2),P(10),U(20,2),M1(20),K2(20),
		*A(400),B1(40),A2(100),DP(10),
		*P0(10),DA(10,10),MB(30),JB(30),LB(30),BU(30),KA(30),LA(30),
		IA(30),JA(30),AP(30)
0002		CALL ASSIGN(2, 'MX1:TOKS.DAT')
0003		READ(2,END=150) N1,N11,12,((A(I,J),I=1,N11),
		*(M1(I),K2(I),I=1,I2)
0004  150	CALL CLOSE(2)
0005		PRINT*,'	***TOKS******TOKS******TOKS***
0006		TYPE*,'������������ ������� ��������? (0-���)'
0007		������*,KS
0008		TYPE*,'�������� ������ ��������?'
0009		ACCEPT*,ID
0010		IF(KS.EQ.0)GOTO 26
0012		PRINT*,'������������ �������'
0013		DO 25 K1=1,N11
0014		PRINT 13,(A(K1,J),J=1,N11)
0015	13	FORMAT (20(F7,3:))
0016	25	CONTINUE
0017	26	TYPE*,'������ ����� � �����?'
0018		ACCEPT*,NDAT
0019		IF(NDAT.EQ.0) GOTO 151
0021		CALL ASSIGN(1,'MX1:TOKD.DAT')
0022		READ(1,*,END=152) NP,(U0(I),P0(I),I=1,NP),NB,NA,(MB(I),JB(I),
		*LB(I),BU(I),I=1,NB),(KA(I),LA(I),IA(I),JA(I),AP(I),I=1,NA)
0023	152	CALL CLOSE(1)
0024		GOTO 153
0025	151	TYPE*,'���������� ������� �����?'
0026		ACCEPT*,NP
0027		TYPE*,'������� ��������� ����������'
0028		ACCEPT*,(U0(I),I=1,NP)
0029		TYPE*,'� ��������'
0030		ACCEPT*,(P0(I),I=1,NP)
0031	57	FORMAT('���������� �������������?')
0032	55	FORMAT( 13,'-� ������ �������� � �������������')
0033		TYPE*,'		���� ������ ��� ������� ����������'
0034		TYPE 57
0035		ACCEPT*,NB
0036		TYPE*,'������� ������� ���������� (U(I,J),U0(L)) �
		* ������������ �'
0037		DO 54 I=1,NB
0038		TYPE 55,I
0039	54	ACCEPT*,MB(I),JB(I),LB(I),BU(I)
0040		TYPE*,'	���� ������ ��� ������� ���������'
0041		TYPE 57
0042		ACCEPT*,NA
0043		TYPE*,'������� ������� ���������� (P(K),U0(L),I(I,J)) �
		* ������������ �'
0044		DO 56 I=1,NA
0045		TYPE 55,I
0046	56	ACCEPT*,KA(I),LA(I),IA(I),JA(I),AP(I)

FORMAT IV	VO2.6	WED 20-DEC-89 00:00:00		PAGE 002

0047		CALL ASSIGN(1,'MX1:TOKD.DAT')
0048		WRITE(1,*) NP,(U0(I),PO(I),I=1,NP),NB,NA,(MB(I),JB(I),
		*LB(I),BU(I),I=1,NB),(KA(I),LA(I),IA(I),JA(I),AP(I),I=1,NA)
0049		CALL CLOSE(1)
0050	153	IF(ID.EQ.0) GOTO 27
0052		PRINT*,'NP',NP,
0053		PRINT*,'U0',(UO(I),I=1,NP)
0054		PRINT*,'P0',(P0(I),I=1,NP)
0055		DO 205 I=1,NB
0056	205	PRINT*,'M,J,L,B',MB(I),JB(I),LB(I),BU(I)
0057		DO 206 I=1,NA
0058	206	PRINT*,'K,L,I,J,A',KA(I),LA(I),IA(I),JA(I),AP(I)
	C		������ ����������
0059	27	TYPE*,'����������� ����������?'
0060		ACCEPT*,RK
0061		TYPE*,'�������� �� ��������?'
0062		ACCEPT*, TP
0063		TYPE*,'* *'
0064	46	DO 71 I=1,N1
0065		U(I,1)=0.
0066	71	U(I,2)=0.
0067		DO 41 I=1,NB
0068		M=MB(I)
0069		J=JB(I)
0070		L=LB(I)
	C	PRINT*,'M,J,L,B',M,J,L,BU(I)
0071	41	U(M,J)=U(M,J)+BU(I)*U0(L)
	C41	TYPE*,'M,J',M,J,' U(M,J)',U(M,J)
0072		CALL LARRAY (2,N11,N11,20,20,A1,A)
0073		CALL LARRAY 92,N11,2,20,2,B1,U)
0074            CALL GELG(B1,A1,N11,2,0.001,IER)
0075		CALL LARRAY(1,N11,2,20,2,B1,B)
0076		S=0.
0077		S1=0.
0078		DO 16 I=1,N11
0079		S1=S1+B(I,2)
	C	PRINT*,'I,S1,B(I,2),B(I,1)',I,S1,B(I,2),B(I,1)
0080	16	S=S+B(I,1)
0081		B(N1,1)=-S
0082		B(N1,2)=-S1
	C	������ ���������
0083		DO 72 I=1,NP
0084		P(I)=0.
0085		DO 72 J=1,NP
0086	72	DA(I,J)=0.
0087		DO 43 I=1,NA
0088		K=KA(I)
0089		L=LA(I)
0090		I1=IA(I)
0091		J=JA(I)
0092		P(K)=P(K)+AP(I)*U0(L)*B(I1,J)
	C	PRINT*,'K,L,I,J,A,U,B*',K,L,I1,J,AP(I),U0(L),B(I1,J)
0093	43	DA(K,L)=DA(K,L)+AP(I)*B(I1,J)
	C	TYPE*,'P',(P(K),K=1,NP)
FORMAT IV	V02.6	WED 20-DEC-89 00:00:00		PAGW 003
0094		D=0.
0095		DO 44 I=1,NP
0096		DPA(I)=P0(I)-P(I)
0097		DP(I)=DPA(I)*RK
0098	44	D=AMAX1(ABS(DPA(I)),D)
0099		IF(D.LE.TP)GOTO 47
0101		TYPE*,'DP:',(DPA(I),I=1,NP)
0102		CALL LARRAY (2,NP,NP,10,10,A2,DA)
0103		CALL GELG(DP,A2,NP,EPS,IER)
0104		DO 45 I=1,NP
0105	45	U0(I)=U0(I)+DP(I)
	C	PRINT 1,(U0(I),I=1,NP),(P(I),I=1,NP)
	C	TYPE*,'DU:',(DP(I),I=1,NP)
0106		GOTO 46
0107	1	FORMAT(' U0:',10(F8.1,3X:)/2X,' P:',10(F12.1,3X:))
0108	47	PRINT*,'����������'
0109		PRINT*,'U0(I),(U0(I),I=1,NP)
0110		DO 80 K1=1.12
0111		I=M1(K1)
0112		K=K2(K1)
0113		PRINT 106,M1(K1),K2(K1),U(K1,1),U(K1,2)
0114	106	FORMAT(' U(',12,',',12,')=',F10.1,2X)
0115	80	CONTINUE
0116		PRINT*,'����'
0117	36	FORMAT(2X,20(F8.2:))
0118		PRINT 19,(I,I=1,N1)
0119	19	FORMAT(20(18:))
0120		DO 37 J=1,2
0121	37	PRINT 36, (B(I,J),I=1,N1
0122		DO	35 I=1,N1
0123	35	B1(I)=SQRT(B(I,1)**2+B(I,2)**2)
0124		PRINT 36,(B1(I),I=1,N1)
0125	100	STOP
0126		END

FORMAT 1V	STORAGE MAR FOR PROGRAM UNIT .MAIN

LOCAL VARIABLES,.PSECT  DATA, SIZE = 012760 (2808.WORDS)

NAME	TYPE	OFFSET 	NAME 	TYPE 	OFFSET	NAME 	TYPE 	OFFSET
D	R*4	012720	EPS	R*4	012724	I	I*2	012644
ID	I*1	012652	IER	I*2	012702	I1	I*2	012716
I2	I*2	012642	J	I*2	012646	K	I*2	012714
KS	I*2	012650	K1	I*2	012654	L	I*2	012700
M	I*2	012676	NA	I*2	012664	NB	I*2	012662
NDAT	I*2	012656	NP	I*2	012660	N1	I*2	012636
N11	I*2	012640	RK	R*4	012666	S	R*4	012704
S1	R*4	012710	TP	R*4	012672



