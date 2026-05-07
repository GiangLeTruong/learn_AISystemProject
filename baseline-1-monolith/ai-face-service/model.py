import torch.nn as nn
from torchvision import models

class FaceRecognitionModel(nn.Module):
    def __init__(self, num_classes, freeze_backbone=True):
        super(FaceRecognitionModel, self).__init__()
        
        self.backbone = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)
        
        if freeze_backbone:
            for param in self.backbone.parameters():
                param.requires_grad = False
        in_features = self.backbone.classifier[1].in_features
        
        self.backbone.classifier = nn.Sequential(
            nn.Dropout(p=0.2),
            nn.Linear(in_features, num_classes) 
        )
        
    def forward(self, x):
        return self.backbone(x)