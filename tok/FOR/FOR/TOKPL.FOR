		TOKPL-������ ����� ������� ������� ����������
		DIMENSION U(40),V(40),X(40),R(20,20),AP(20,20),AP1(100),
		*BP(20,2)B1(20),M1P(10),K2(10),RIN(20,20),LN(20)
		TYPE*,'������ ����� � �����?(1-��)'
		ACCEPT*,NDAT
		CALL ASSIGN(1,'MX1:TOKPL.DAT')
		IF9nDAT.EQ.0) GOTO 1010
		READ(1,*) H,C,C2,N,N2,RO,N1,(U(I),V(I),I=1,N2),12,
		*(BP(I,1),BP(I,2),I=1,12),(M1P(I),K2(I),I=1,12)
		CALL CLOSE(1)
		GOTO 1011
	1010	TYPE*,'������� ������� �����:������,�����,������'
		ACCEPT*,H,C,C2
		TYPE*,'������� ���������� ����������'
		ACCEPT*,N
		N2=N*2
		TYPE*,'������� ���������� ���������� U'
		ACCEPT*,(U(I),I=1,N2)
		TYPE*,'������� ���������� ����������V'
		ACCEPT*,(V(I),I=1N2)
		TYPE*,'������� �������� ��.������.�������������'
		ACCEPT*,RO
		TYPE*,'������� �������� ���������� ����������(0 ��� 1)'
		ACCEPT*,N1
	1011	P1=3.1415926
		A=PI/C
		A1=A*H
		B=(EXP(A1)+EXP(-A1))*0.5
		D1=RO/PI/C2
		D2=P1*RO/C2
		DO 1 I=1,N2
		A2=A*U(I)
		A1=A*V(I)
		E1=EXP(A1)*0.5
		E2=EXP(-A1)*0.5
		CH=E1+E2
		SH=E1+E2
		P=SIN(A2)*CH/B
		Q=COS(A2)*SH/B
		S=P**2+Q**2
		X(I)=P+P/S
	1	CONTINUE
		DO 2 L=1,N
		DO 2 M=1,N
		IF(L.NE.M) GOTO 3
		R(L.M)=0
		GOTO 2
	3	L1=L*2
		L2=L1-1
		M1=M*2
		M2=M1-1
		S1=X(L2)-X(M1)
		S2=X(L1)-X(M2)
		S3=X(L2)-X(M2)
		S4=X(L1)-X(M1)
		PK=S1*S2/S3/S4
		IF(N1.NE.10 GOTO 4
		IF(L.EQ.1) GOTO 10
		IF(M.NE.1) GOTO 4
	10	PK=1-PK
		IF(PK.GE.0.5) GOTO 5
		S5=SQRT(SQRT(SQRT(1-PK)))
		S6=(1+S5)/(1-S5)
		S7=ALOG((S6)
		R(L,M)=D1*S7
		GOTO 2
	5	S5=SQRT(SQRT(SQRT(PK)))
		S6=(1+S5)/(1-S5)
		S7=ALOG(S6)
		R(L,M)=D2/S7
		GOTO 2
	4	IF(PK.GE.0.5)GOTO 6
		S5=SQRT(SQRT(SQRT(1-PK)))
		S6=(1+S5)/(1-S5)
		S7=ALOG(S6)
		R(L,M,)=D2/S7
		GOTO 2
	6	S5=SQRT(SQRT(SQRT(PK)))
		S6=(1+S5)/(1-S5)
		S7=ALOG(S6)
		R(L,M)=D1*S7
	2	CONTINUE
		PRINT*,'********TOKPL**********TOKPL********'
		PRINT 91,H,C,C2,N,RO,N1
	91	FORMAT(/20X,'�������� ������'//5X,'������ ����� - ',F4.0/
		*5X,'����� ����� -',F4.0/5X,'������ ����� - ',F4.0/5X,'����
		*������ ���������� -'.12/5X,'��.��. ������������� -',F6.3
		*/5X,'�������� ���������� ���������� -',12/5X,'����������
		* ���������� '/)
		PRINT 92,(U(I),I=1,N2)
		PRINT 92,(V(I),I=1,N2)
	92	FORMAT(/2X,20(F6.2,2X,F6.2.' !':)) 
		PRINT 97,(M,M=1,N)
	97	FORMAT(/10X,'���� ������������� 2'//2X,20(12:,4X))
		DO 8 L=1,N
		PRINT 9,L,(R(L,M),M=1,N)
	9	FORMAT(/12,20F6.3)
	8	CONTINUE
		TYPE*,'�������������� ������� ����������!'
		DO 61 I=1,N
		TYPE 62,I
	62	FORMAT ( 2X,12,'-�� ��������� ������������������� ')
	61	ACCEPT*,LN(I)
		DO 63 I=1,N
		I1=LN(I)
		DO 63 J=1,N
		J1=LN(J)
	63	RIN(I1,J1)=R(I,J)
		PRINT 64,(M,M=1,N)
	64	FORMAT(/10X,'����� ���� ������������� 2'//2X,20(12:,4X))
		DO 65 L=1,N
		PRINT 66,L,(RIN(L,M),M=1,N)
	66	FORMAT(/12,20F6.3)
	65	CONTINUE
	
				
		 

