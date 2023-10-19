from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers
from .models import *
from mainapp.utils import BaseSerializer
from account.serializers import AccountSerializer


class ProjectSerializer(BaseSerializer, serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ['id', 'created_by', 'name', 'code', 'created_on', 'updated_on']
        
    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'created_by' in required_fields:
            self.fields['created_by'] = AccountSerializer(many=False)
        return super(ProjectSerializer, self).to_representation(instance)


class BudgetLineSerializer(BaseSerializer, serializers.ModelSerializer):
    class Meta:
        model = BudgetLine
        fields = ['id', 'created_by', 'project', 'code', 'text', 'created_on', 'updated_on']

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'created_by' in required_fields:
            self.fields['created_by'] = AccountSerializer(many=False)
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        return super(BudgetLineSerializer, self).to_representation(instance)


class FormUserSerializer(BaseSerializer, serializers.ModelSerializer):
    class Meta:
        model = FormUser
        fields = ['id', 'user', 'signature', 'date', 'created_on', 'updated_on']

    # def create(self, validated_data):
    #     print(self.initial_data)
    #     return {}

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'user' in required_fields:
            self.fields['user'] = AccountSerializer(many=False)
        return super(FormUserSerializer, self).to_representation(instance)


class AmountReceivedSerializer(BaseSerializer, serializers.ModelSerializer):
    class Meta:
        model = AmountReceived
        fields = ['id', 'amount', 'receipt', 'date', 'created_on', 'updated_on']


class CashAdvanceFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = CashAdvanceForm
        fields = ['id', 'country', 'currency', 'requested_by', 'checker', 'checked_by', 'approver', 'approved_by', 'amount_received', 'name',
                  'level', 'invoice_number', 'bank_batch_no', 'date', 'purpose', 'project', 'activity_end_date',
                  'expected_liquidation_date', 'items', 'total', 'is_completed', 'created_on', 'updated_on']

    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('requested_by[user]'),
            'signature': self.initial_data.get('requested_by[signature]'),
            'date': self.initial_data.get('requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

        validated_data['requested_by'] = requested_by
        return super().create(validated_data)

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        # if 'checker' in required_fields:
        #     self.fields['checker'] = AccountSerializer(many=False)
        if 'checked_by' in required_fields:
            self.fields['checked_by'] = FormUserSerializer(many=False)
        # if 'approver' in required_fields:
        #     self.fields['approver'] = AccountSerializer(many=False)
        if 'approved_by' in required_fields:
            self.fields['approved_by'] = FormUserSerializer(many=False)
        if 'amount_received' in required_fields:
            self.fields['amount_received'] = AmountReceivedSerializer(many=False)
        return super(CashAdvanceFormSerializer, self).to_representation(instance)


class NotificationSerializer(BaseSerializer, serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ['id', 'receiver', 'sender', 'form', 'message', 'url', 'read', 'created_on', 'updated_on']

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'receiver' in required_fields:
            self.fields['receiver'] = AccountSerializer(many=False)
        if 'sender' in required_fields:
            self.fields['sender'] = AccountSerializer(many=False)
        return super(NotificationSerializer, self).to_representation(instance)


class ExpenseClaimFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = ExpenseClaimForm
        fields = ['id', 'country', 'currency', 'requested_by', 'checker', 'checked_by', 'approver', 'approved_by', 'amount_received', 'name',
                  'level', 'invoice_number', 'bank_batch_no', 'purpose', 'project', 'budget_line', 'expense_incured'
                  'reason', 'items', 'total', 'is_completed', 'created_on', 'updated_on']

    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('expense_requested_by[user]'),
            'signature': self.initial_data.get('expense_requested_by[signature]'),
            'date': self.initial_data.get('expense_requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

        validated_data['expense_requested_by'] = requested_by
        return super().create(validated_data)

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        # if 'checker' in required_fields:
        #     self.fields['checker'] = AccountSerializer(many=False)
        if 'expense_checked_by' in required_fields:
            self.fields['expense_checked_by'] = FormUserSerializer(many=False)
        # if 'approver' in required_fields:
        #     self.fields['approver'] = AccountSerializer(many=False)
        if 'expense_approved_by' in required_fields:
            self.fields['expense_approved_by'] = FormUserSerializer(many=False)
        if 'amount_received' in required_fields:
            self.fields['amount_received'] = AmountReceivedSerializer(many=False)
        return super(ExpenseClaimFormSerializer, self).to_representation(instance)
    
class RequestForQuatationFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)


    class Meta:
        model = RequestForQuatationForm
        fields = ['id', 'country', 'currency', 'requested_by', 'vendor_name', 'address', 'phone_number', 'delivery_period', 'price_validity_period', 'warranty_period' 'name',
                  'payment_terms', 'level', 'invoice_number', 'bank_batch_no', 'items_required_by', 'items', 'total', 'is_completed', 'created_on', 'updated_on']
        
    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('quatation_requested_by[user]'),
            'signature': self.initial_data.get('quatation_requested_by[signature]'),
            'date': self.initial_data.get('quatation_requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

        validated_data['quatation_requested_by'] = requested_by
        return super().create(validated_data)

class OverExpendintureFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = OverExpendintureForm
        fields = ['id', 'country', 'currency', 'requested_by', 'checker', 'checked_by', 'approver', 'approved_by', 'amt_received_description', 'amount_received', 'name',
                  'level', 'invoice_number', 'bank_batch_no', 'date', 'project', 'project_code', 'budget_line', 'items', 'total', 'is_completed', 'created_on', 'updated_on']
        
    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('over_expenditure_requested_by[user]'),
            'signature': self.initial_data.get('over_expenditure_requested_by[signature]'),
            'date': self.initial_data.get('over_expenditure_requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

            validated_data['over_expenditure_requested_by'] = requested_by
            return super().create(validated_data)
        elif requested_by_serializer.errors:
            print(requested_by_serializer.errors)
            return requested_by_serializer.errors
        
class UnderExpendintureFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = OverExpendintureForm
        fields = ['id', 'country', 'currency', 'requested_by', 'checker', 'checked_by', 'approver', 'approved_by', 'amt_received_description', 'amount_received', 'name',
                  'level', 'invoice_number', 'bank_batch_no', 'date', 'project', 'project_code', 'budget_line', 'items', 'total', 'is_completed', 'created_on', 'updated_on']
        
    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('under_expenditure_requested_by[user]'),
            'signature': self.initial_data.get('under_expenditure_requested_by[signature]'),
            'date': self.initial_data.get('under_expenditure_requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

            validated_data['under_expenditure_requested_by'] = requested_by
            return super().create(validated_data)
        
class LocalPurchaseOrderFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = LocalPurchaseOrderForm
        fields = ['id', 'country', 'currency', 'invoice_number', 'bank_batch_no', 'project', 'budget_line', 'date', 'payment_terms', 'delivery_date', 
                  'supplier', 'address', 'mobile', 'items', 'requested_by', 'delivery_costs', 'return_to_name', 'return_to_email', 'is_completed', 'created_on', 'updated_on']
                  
        
    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('local_purchase_requested_by[user]'),
            'signature': self.initial_data.get('local_purchase_requested_by[signature]'),
            'date': self.initial_data.get('local_purchase_requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

        validated_data['local_purchase_requested_by'] = requested_by
        return super().create(validated_data)
    
class PurchaseRequisitionFormSerializer(BaseSerializer, serializers.ModelSerializer):
    requested_by = FormUserSerializer(many=False, required=False)

    class Meta:
        model = ExpenseClaimForm
        fields = ['id', 'country', 'currency', 'requested_by', 'delivered_to', 'checker', 'checked_by', 'approver', 'approved_by', 'amount_received', 'name',
                  'level', 'invoice_number', 'bank_batch_no', 'date', 'purpose', 'project',
                  'items_required_by', 'items', 'total', 'is_completed', 'created_on', 'updated_on']

    def create(self, validated_data):
        requested_by_data = {
            'user': self.initial_data.get('purchase_requested_by[user]'),
            'signature': self.initial_data.get('purchase_requested_by[signature]'),
            'date': self.initial_data.get('purchase_requested_by[date]'),
        }
        requested_by_serializer = FormUserSerializer(data=requested_by_data)
        requested_by = None
        if requested_by_serializer.is_valid():
            requested_by = requested_by_serializer.save()

        validated_data['purchase_requested_by'] = requested_by
        return super().create(validated_data)

    def to_representation(self, instance):
        fields = self.get_fields()
        required_fields = set(fields.keys())
        if 'project' in required_fields:
            self.fields['project'] = ProjectSerializer(many=False)
        # if 'checker' in required_fields:
        #     self.fields['checker'] = AccountSerializer(many=False)
        if 'purchase_checked_by' in required_fields:
            self.fields['purchase_checked_by'] = FormUserSerializer(many=False)
        # if 'approver' in required_fields:
        #     self.fields['approver'] = AccountSerializer(many=False)
        if 'approved_by' in required_fields:
            self.fields['purchase_approved_by'] = FormUserSerializer(many=False)
        if 'amount_received' in required_fields:
            self.fields['amount_received'] = AmountReceivedSerializer(many=False)
        return super(ExpenseClaimFormSerializer, self).to_representation(instance)

